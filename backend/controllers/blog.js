const BlogService = require('../services/blog');

class BlogController {
  constructor() {
    this.blogService = new BlogService();
  }

  async create(req, res) {
    try {
      const blogData = {
        ...req.body,
        userId: req.user.id
      };

      // STRATEGY PATTERN: The controller doesn't know about strategies
      // It just passes the data to the service, which handles strategy selection
      const blog = await this.blogService.create(blogData);
      
      if (!blog) {
        return res.status(400).json({
          success: false,
          message: 'Blog creation failed'
        });
      }

      res.status(201).json({
        success: true,
        // STRATEGY PATTERN: The strategy type comes from req.body.strategy
        message: `Blog created as ${req.body.strategy || 'draft'} successfully`,
        data: blog
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const blogData = req.body;

      // STRATEGY PATTERN: Same pattern for updates - service handles strategy
      const blog = await this.blogService.update(id, blogData);
      
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      res.json({
        success: true,
        // STRATEGY PATTERN: Reflects which strategy was used
        message: `Blog updated with ${req.body.strategy || 'draft'} strategy`,
        data: blog
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async fetchAll(req, res) {
    try {
      const blogs = await this.blogService.findByUser(req.user.id);
      
      res.json({
        success: true,
        data: blogs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async fetchOne(req, res) {
    try {
      const { id } = req.params;
      const blog = await this.blogService.findOne({ _id: id, userId: req.user.id });
      
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      res.json({
        success: true,
        data: blog
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await this.blogService.delete(id);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      res.json({
        success: true,
        message: 'Blog deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // STRATEGY PATTERN: Expose available strategies to frontend
async getStrategies(req, res) {
  try {
    const strategies = this.blogService.getAvailableStrategies(); // This is synchronous, no await needed
    
    res.json({
      success: true,
      data: strategies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
}

module.exports = BlogController;