import './template.css'

const DesignerTemplate = ({data, size = 'full'}) => {
  const {firstname, lastname, email, phone, summary, workExperiences, educations} = data
  let className
  if (size === 'thumbnail') {
    className = 'thumbnail-temp'
  } else {
    className = 'full-temp'
  }
  return (
    <div className={`designer-temp ${className} relative border rounded-lg bg-orange-100/30 h-full`}>
      <div>
        <div className="title flex justify-between items-end relative z-10">
          {/* name */}
          <h1 className="font-bold font-playfair">{firstname} {lastname}</h1>
          {/* contact */}
          <div>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
          </div>
        </div>
        {/* summary */}
        <div className="section summary relative z-10">
          <h2 className="font-bold text-gray-600">About Me</h2>
          <p>{summary}</p>
        </div>
        {/* work experience */}
        <div className="section work-experience relative z-10">
          <h2 className="font-bold text-gray-600">Experience</h2>
          <ul>
            {workExperiences.map((w, i) => {
              return (
                <li key={`${w.companyName}${i}`}>
                  <div className={`flex items-center ${size === 'thumbnail' ? 'gap-1' : 'gap-4'}`}>
                    <p className="font-bold">{w.companyName}</p>
                    <p className="text-gray-500">
                      <span>{w.startDate}</span>
                      <span className={size === 'thumbnail' ? 'mx-1' : 'mx-2'}>~</span>
                      <span>{w.endDate}</span>
                    </p>
                  </div>
                  <p>{w.responsibility}</p>
                </li>
              )
            })}
          </ul>
        </div>
        {/* education */}
        <div className="section education relative z-10">
          <h2 className="font-bold text-gray-600">Education</h2>
          <ul>
            {educations.map((edu, i) => {
              return (
                <li key={`${edu.institution}${i}`} className={`flex items-center ${size === 'thumbnail' ? 'gap-1' : 'gap-4'}`}>
                  <p className="font-bold">{edu.degree}</p>
                  <p className="font-bold">{edu.institution}</p>
                  <p className="text-gray-500">
                    <span>{edu.startDate}</span>
                    <span className={size === 'thumbnail' ? 'mx-1' : 'mx-2'}>~</span>
                    <span>{edu.endDate}</span>
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="absolute rounded-full z-0 shape-1"></div>
        <div className="absolute rounded-full z-0 shape-2"></div>
        <div className="absolute rounded-full z-0 shape-3"></div>
      </div>
    </div>
  )
}

export default DesignerTemplate
