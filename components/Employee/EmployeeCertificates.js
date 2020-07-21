import {Card} from 'semantic-ui-react'
import formatDate from '../../utils/formatDate'

function EmployeeCertificates({employee}) {
    const isRsa = employee.rsa === ''
    const isFirstaid = employee.firstaid === ''
    const isFirewarden = employee.firewarden === ''
    const isFoodsaftey = employee.foodsaftey === ''
    const isWwcc = employee.wwcc === ''

    return (
        <>
            <Card.Group centered itemsPerRow={5}>
                {!isRsa &&
                    <Card
                        header="RSA"
                        meta={employee.rsa}
                        description= {formatDate(employee.rsaExpiry)}
                        color="blue"
                    />
                }
                {!isFirstaid && 
                    <Card
                        header="First Aid"
                        meta={employee.firstaid}
                        description={formatDate(employee.firstaidExpiry)}
                        color="green"
                    />
                }
                {!isFirewarden && 
                    <Card
                        header="Fire Warden"
                        meta={employee.firewarden}
                        description={formatDate(employee.firewardenExpiry)}
                        color="red"
                    />
                }
                {!isFoodsaftey && 
                    <Card
                        header="Food Saftey"
                        meta={employee.foodsaftey}
                        description={formatDate(employee.foodsafteyExpiry)}
                        color="yellow"
                    />
                }
                {!isWwcc && 
                    <Card
                        header="WWCC"
                        meta={employee.wwcc}
                        description={formatDate(employee.wwccExpiry)}
                        color="teal"
                    />
                }
            </Card.Group>
        </>

    )
}

export default EmployeeCertificates