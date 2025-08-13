import './template.css'

const SoftwareEngineerTemplate = ({data, size = 'full'}) => {
  const {firstname, lastname, email, phone, summary, workExperiences, educations} = data
  let className
  if (size === 'thumbnail') {
    className = 'thumbnail-temp'
  } else {
    className = 'full-temp'
  }
  return (
    <div className={`software-engineer-temp ${className} relative border rounded-lg h-full`}>
      <h1 className="font-bold bg-sky-900 text-white rounded-t-lg uppercase">{firstname} {lastname}</h1>
      <div className="content grid grid-cols-12">
        <div className="col col-span-3">
          {/* contact */}
          <div className="pr-8">
            <h2 className="font-semibold text-gray-600 uppercase">Contact</h2>
            <p>{email}</p>
            <p>{phone}</p>
          </div>
        </div>
        <div className="col col-span-9 border-l-2">
          {/* summary */}
          <div className="section summary">
            <h2 className="font-semibold text-gray-600 uppercase">Profile</h2>
            <p>{summary}</p>
          </div>
          {/* work experience */}
          <div className="section work-experience">
            <h2 className="font-semibold text-gray-600 uppercase">Experience</h2>
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
            <h2 className="font-semibold text-gray-600 uppercase">Education</h2>
            <ul>
              {educations.map((edu, i) => {
                return (
                  <li key={`${edu.institution}${i}`}>
                    <p className="text-gray-500">
                      <span>{edu.startDate}</span>
                      <span className={size === 'thumbnail' ? 'mx-1' : 'mx-2'}>~</span>
                      <span>{edu.endDate}</span>
                    </p>
                    <div className={`flex items-center ${size === 'thumbnail' ? 'gap-1' : 'gap-4'}`}>
                      <p className="font-bold">{edu.degree}</p>
                      <p className="font-bold">{edu.institution}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoftwareEngineerTemplate
