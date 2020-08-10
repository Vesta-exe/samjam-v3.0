import {Item, Label, Segment, Header, Icon} from 'semantic-ui-react'
import formatDate from '../../utils/formatDate'

function EmployeeRegister({employee, performances}) {

    return <>
        <Header as="h2">
            <Icon name="chart area" color="violet"/>
            Performance Register
        </Header>
        {performances.map(performance=> {

            const isPositive = performance.type === "Positive"
            const isNegative = performance.type === "Negative"
            const isSick = performance.type === "Sick"
            const isCashhandling = performance.type === "Cash Handling"

            if(performance.employee._id === employee._id) {
                return (
                    <Segment raised>
                    {isPositive &&
                        <Label color='green' ribbon>
                            {formatDate(performance.date)}
                        </Label>
                    }
                    {isNegative &&
                        <Label color='red' ribbon>
                            {formatDate(performance.date)}
                        </Label>
                    }
                    {isSick &&
                        <Label color='olive' ribbon>
                            {formatDate(performance.date)}
                        </Label>
                    }
                    {isCashhandling &&
                        <Label color='teal' ribbon>
                            {formatDate(performance.date)}
                        </Label>
                    }
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <p><strong>Manager: </strong>{performance.manager}</p>
                                <p><strong>Note Type: </strong>{performance.type}</p>
                                <p><strong>Incident Type: </strong>{performance.incident}</p>
                                <p><strong>Description: </strong>{performance.description}</p>
                                <p><strong>Followup Manager: </strong>{performance.followupManager}</p>
                                <p><strong>Followup Description: </strong>{performance.followupDescription}</p>
                                <p><strong>Updated: </strong>{formatDate(performance.updatedAt)}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                )
            }
        })}
    </>
}

export default EmployeeRegister