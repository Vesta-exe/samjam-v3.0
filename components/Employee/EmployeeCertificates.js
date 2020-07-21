import {Card} from 'semantic-ui-react'

function EmployeeCertificates({employee}) {
    return (
        <>
            <Card.Group centered itemsPerRow={5}>
                <Card
                    header="RSA"
                    meta={employee.rsa}
                    description={employee.rsaExpiry}
                    color="blue"
                />
                <Card
                    header="First Aid"
                    meta={employee.firstaid}
                    description={employee.firstaidExpiry}
                    color="green"
                />
                <Card
                    header="Fire Warden"
                    meta={employee.firewarden}
                    description={employee.firewardenExpiry}
                    color="red"
                />
                <Card
                    header="Food Saftey"
                    meta={employee.foodsaftey}
                    description={employee.foodsafteyExpiry}
                    color="yellow"
                />
                <Card
                    header="WWCC"
                    meta={employee.wwcc}
                    description={employee.wwccExpiry}
                    color="teal"
                />
            </Card.Group>
        </>

    )
}

export default EmployeeCertificates