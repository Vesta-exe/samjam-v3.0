import { Table, Header, Icon, Segment, Button } from "semantic-ui-react";
import baseUrl from "../../utils/baseUrl";
import formatDate from "../../utils/formatDate";
import { useFetchUser } from "../../utils/user";
import Router from "next/router";

//for printing
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function Firstaid({ employeeData }) {
  const { user, loading } = useFetchUser();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!user && !loading) {
    Router.push("/");
  }

  return (
    <div>
      <Segment>
        <Header as="h2">
          <Icon name="medkit" color="green" />
          First Aid Register
        </Header>
      </Segment>
      <Button color="blue" floated="right" onClick={handlePrint}>
        Print
      </Button>
      <br />
      <br />
      <div ref={componentRef}>
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell rowSpan="2">Employee #</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Name</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">First Aid#</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Expiry</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {employeeData
              .filter(
                (employee) =>
                  (employee.firstaid !== "") & (employee.archived === "No")
              )
              .map((filteredEmployee) => {
                return (
                  <Table.Row key={filteredEmployee.id}>
                    <Table.Cell>{filteredEmployee.kronos}</Table.Cell>
                    <Table.Cell>{filteredEmployee.name}</Table.Cell>
                    <Table.Cell>{filteredEmployee.firstaid}</Table.Cell>
                    <Table.Cell>
                      {formatDate(filteredEmployee.firstaidExpiry)}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const employees = await fetch(`${baseUrl}/api/employees`);
  const { employeeData } = await employees.json();

  return { props: { employeeData } };
}

export default Firstaid;
