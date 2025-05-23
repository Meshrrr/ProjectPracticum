import { Link } from "react-router-dom";

export default function VacancyList({ vacancies }) {
  return (
    <div className="row">
      {vacancies.map((vacancy) => (
        <div key={vacancy.id} className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{vacancy.title}</h5>
              <p className="card-text">{vacancy.description}</p>
              <Link to={`/vacancy/${vacancy.id}`} className="btn btn-primary">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
