// services/blog.js
const { Blog } = require("../models");
const BaseService = require("./base");

// STRATEGY PATTERN: Strategy Interface Definition
class PublishingStrategy {
  validate(blogData) {
    throw new Error('validate method must be implemented by concrete strategies');
  }
  
  process(blogData) {
    throw new Error('process method must be implemented by concrete strategies');
  }
  
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}

// STRATEGY PATTERN: Concrete Strategy - Draft
class DraftStrategy extends PublishingStrategy {
  validate(blogData) {
    const errors = [];
    if (!blogData.title || blogData.title.trim().length === 0) {
      errors.push('Title is required');
    }
    return { isValid: errors.length === 0, errors };
  }
  
  process(blogData) {
    return { 
      ...blogData, 
      status: 'draft',
      publishedAt: null,
      slug: this.generateSlug(blogData.title) + '-draft'
    };
  }
}

// STRATEGY PATTERN: Concrete Strategy - Schedule
class ScheduleStrategy extends PublishingStrategy {
  validate(blogData) {
    const errors = [];
    
    if (!blogData.scheduleDate) {
      errors.push('Schedule date is required');
    } else if (new Date(blogData.scheduleDate) <= new Date()) {
      errors.push('Schedule date must be in the future');
    }
    
    if (!blogData.title || blogData.title.trim().length < 5) {
      errors.push('Title is required');
    }
    
    return { isValid: errors.length === 0, errors };
  }
  
  process(blogData) {
    return { 
      ...blogData, 
      status: 'scheduled',
      publishedAt: new Date(blogData.scheduleDate),
      slug: this.generateSlug(blogData.title) + '-scheduled'
    };
  }
}

// STRATEGY PATTERN: Context Class (BlogService)
class BlogService extends BaseService {
  constructor() {
    super(Blog);
    // STRATEGY PATTERN: Registry of available strategies (publish removed)
    this.strategies = {
      draft: new DraftStrategy(),
      schedule: new ScheduleStrategy()
      // publish strategy removed
    };
  }

  async create(data) {
    const { strategy = 'draft', ...blogData } = data;
    
    const strategyHandler = this.strategies[strategy];
    if (!strategyHandler) {
      throw new Error(`Invalid strategy: ${strategy}`);
    }

    const validation = strategyHandler.validate(blogData);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const processedData = strategyHandler.process(blogData);
    
    try {
      const blog = await Blog.create(processedData);
      return blog;
    } catch (error) {
      return null;
    }
  }

  async update(id, data) {
    const { strategy = 'draft', ...blogData } = data;
    
    const strategyHandler = this.strategies[strategy];
    if (!strategyHandler) {
      throw new Error(`Invalid strategy: ${strategy}`);
    }

    const validation = strategyHandler.validate(blogData);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const processedData = strategyHandler.process(blogData);
    return await Blog.findByIdAndUpdate(id, processedData, { new: true });
  }

  async findByUser(userId) {
    return await Blog.find({ userId }).sort({ createdAt: -1 });
  }

  async findPublished() {
    return await Blog.find({ status: 'published' }).sort({ publishedAt: -1 });
  }

  // STRATEGY PATTERN: Expose available strategies to clients
  getAvailableStrategies() {
    return Object.keys(this.strategies);
  }
}

module.exports = BlogService;