import {Button, Icon} from 'semantic-ui-react'
import Link from 'next/link'

function EmployeeButtons({employee}) {
    const isRsa = employee.rsa === ''
    const isFirstaid = employee.firstaid === ''
    const isFirewarden = employee.firewarden === ''
    const isFoodsaftey = employee.foodsaftey === ''
    const isWwcc = employee.wwcc === ''

    return <>
        <Link href={`/employee/${employee._id}/edit`}>
            <Button icon color="orange" labelPosition="left" aria-label="edit">
                <Icon name="edit"/>
                Edit
            </Button>
        </Link>
        {!isRsa 
            ? <Link href={`/employee/${employee._id}/rsa`}>
                <Button icon color="blue" labelPosition="left" aria-label="edit rsa">
                    <Icon name="martini glass"/>
                        Edit RSA
                </Button>
            </Link>
            : <Link href={`/employee/${employee._id}/rsa`}>
                <Button icon color="blue" labelPosition="left" aria-label="add rsa">
                    <Icon name="martini glass"/>
                        Add RSA
                </Button>
            </Link>
        }
        {!isFirstaid
            ? <Link href={`/employee/${employee._id}/firstaid`}>
                <Button icon color="green" labelPosition="left" aria-label="edit first aid">
                    <Icon name="medkit"/>
                        Edit First Aid
                </Button>
            </Link>
            : <Link href={`/employee/${employee._id}/firstaid`}>
                <Button icon color="green" labelPosition="left" aria-label="add first aid">
                    <Icon name="medkit"/>
                        Add First Aid
                </Button>
            </Link>
        }
        {!isFirewarden
            ? <Link href={`/employee/${employee._id}/firewarden`}>
                <Button icon color="red" labelPosition="left" aria-label="edit fire warden">
                    <Icon name="fire extinguisher"/>
                        Edit Fire Warden
                </Button>
            </Link>
            : <Link href={`/employee/${employee._id}/firewarden`}>
                <Button icon color="red" labelPosition="left" aria-label="add fire warden">
                    <Icon name="fire extinguisher"/>
                        Add Fire Warden
                </Button>
            </Link>
        }
        {!isFoodsaftey
            ? <Link href={`/employee/${employee._id}/foodsaftey`}>
                <Button icon color="yellow" labelPosition="left" aria-label="edit food saftey">
                    <Icon name="utensils"/>
                        Edit Food Saftey
                </Button>
            </Link>
            : <Link href={`/employee/${employee._id}/foodsaftey`}>
                <Button icon color="yellow" labelPosition="left" aria-label="add food saftey">
                    <Icon name="utensils"/>
                        Add Food Saftey
                </Button>
            </Link>
        }
        {!isWwcc
            ? <Link href={`/employee/${employee._id}/wwcc`}>
                <Button icon color="teal" labelPosition="left" aria-label="edit wwcc">
                    <Icon name="child"/>
                        Add WWCC
                </Button>
            </Link>
            : <Link href={`/employee/${employee._id}/wwcc`}>
                <Button icon color="teal" labelPosition="left" aria-label="add wcc">
                    <Icon name="child"/>
                        Add WWCC
                </Button>
            </Link>
        }
    </>
}

export default EmployeeButtons