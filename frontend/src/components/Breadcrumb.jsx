import {Link} from 'react-router-dom';

const Breadcrumb = ({linkList}) => {
  return (
    <ul className="flex items-center">
      {linkList.map((l, i) => {
        return (
          <li key={l.label} className="flex items-center">
            {i === linkList.length - 1 ? (
              <span className="text-gray-500">{l.label}</span>
            ) : (
              <div>
                <Link to={l.href} className="text-violet-800">{l.label}</Link>
                <span className="text-violet-800">&nbsp;/&nbsp;</span>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default Breadcrumb
