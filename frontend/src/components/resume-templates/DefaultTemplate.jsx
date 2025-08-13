import './template.css'

const DefaultTemplate = ({data, size = 'full'}) => {
  const {firstname, lastname, email, phone, summary, workExperiences, educations} = data
  let className
  if (size === 'thumbnail') {
    className = 'thumbnail-temp'
  } else {
    className = 'full-temp'
  }
  return (
    <div className={`default-temp ${className} border rounded-lg h-full`}>
      <div>
        {/* name */}
        <h1 className="font-bold">{firstname} {lastname}</h1>
        {/* contact */}
        <div className="flex items-center gap-2 py-2">
          <p>Email: {email} | </p>
          <p>Phone Number: {phone}</p>
        </div>
        {/* summary */}
        <div className="section summary">
          <h2 className="font-bold">Profile</h2>
          <p>{summary}</p>
        </div>
        {/* work experience */}
        <div className="section work-experience">
          <h2 className="font-bold">Experience</h2>
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
        <div className="section education">
          <h2 className="font-bold">Education</h2>
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
      </div>
    </div>
  )
}

export default DefaultTemplate
