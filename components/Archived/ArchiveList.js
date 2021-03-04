import { Card } from "semantic-ui-react";
import Link from "next/link";

function ArchiveList({ employees }) {
  return (
    <div>
      <Card.Group centered itemsPerRow={6} stackable>
        {employees.map((employee) => {
          if (employee.archived === "Yes") {
            return (
              <div key={employee.id} className="employeeCard">
                <Link href={`/employee/${employee._id}`}>
                  <Card
                    image={employee.mediaUrl}
                    header={employee.name}
                    meta={employee.kronos}
                    description={employee.employment}
                    color="blue"
                  />
                </Link>
              </div>
            );
          }
        })}
      </Card.Group>
    </div>
  );
}

export default ArchiveList;
