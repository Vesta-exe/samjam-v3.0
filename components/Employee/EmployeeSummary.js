import {Item, Label} from 'semantic-ui-react'
import formatDate from '../../utils/formatDate'

function EmployeeSummary({ employee}) {
    const isCB = employee.CB === 'Yes'
    const isTO = employee.TO === 'Yes'
    const isGC = employee.GC === 'Yes'
    const isFLR = employee.FLR === 'Yes'
    const isINT = employee.INT === 'Yes'
    const isVJR = employee.VJR === 'Yes'
    const isCBTL = employee.CBTL === 'Yes'
    const isTOTL = employee.TOTL === 'Yes'
    const isGCMOD = employee.GCMOD === 'Yes'
    const isFLRTL = employee.FLRTL === 'Yes'
    const isINTTL = employee.INTTL === 'Yes'
    const isVJRTL = employee.VJRTL === 'Yes'
    const isMOD = employee.MOD === 'Yes'
    const isNone = employee.study === 'None'
    const isYear10 = employee.study === 'Year 10'
    const isYear11 = employee.study === 'Year 11'
    const isYear12 = employee.study === 'Year 12'
    const isTAFE = employee.study === 'TAFE'
    const isUNI = employee.study === 'UNI'

    return (
        <Item.Group>
            <Item>
                <Item.Image size="medium" src={employee.mediaUrl}/>
                <Item.Content>
                    <Item.Header><h1> {employee.name} </h1></Item.Header>
                    <Item.Description>
                        <h3><strong> {employee.employment} </strong></h3>
                        {isMOD &&
                            <Label circular color="black">MOD</Label>
                        }
                        {isCBTL && isCB && !isMOD &&
                            <Label circular color="blue">CB TL</Label>
                        }
                        {isCB && !isCBTL && !isMOD &&
                            <Label circular color="blue">CB</Label>
                        }
                        {isTOTL && isTO && !isMOD &&
                            <Label circular color="teal">TO TL</Label>
                        }
                        {isTO && !isTOTL && !isMOD &&
                            <Label circular color="teal">TO</Label>
                        }
                        {isGC && isGCMOD && !isMOD &&
                            <Label circular color="yellow">GC MOD</Label>
                        }
                        {isGC && !isGCMOD && !isMOD &&
                            <Label circular color="yellow">GC</Label>
                        }
                        {isFLR && isFLRTL && !isMOD &&
                            <Label circular color="green">FLR TL</Label>
                        }
                        {isFLR && !isFLRTL && !isMOD &&
                            <Label circular color="green">FLR</Label>
                        }
                        {isINT && isINTTL && !isMOD &&
                            <Label circular color="red">INT TL</Label>
                        }
                        {isINT && !isINTTL && !isMOD &&
                            <Label circular color="red">INT</Label>
                        }
                        {isVJR && isVJRTL && !isMOD &&
                            <Label circular color="orange">VJR TL</Label>
                        }
                        {isVJR && !isVJRTL && !isMOD &&
                            <Label circular color="orange">VJR</Label>
                        }
                        <br/>
                        <br/>
                        {isNone &&
                            <Label circular color="black">No Study</Label>
                        }
                        {isYear10 &&
                            <Label circular color="blue">Year 10</Label>
                        }
                        {isYear11 &&
                            <Label circular color="teal">Year 11</Label>
                        }
                        {isYear12 &&
                            <Label circular color="violet">Year 12</Label>
                        }
                        {isTAFE &&
                            <Label circular color="purple">TAFE</Label>
                        }
                        {isUNI &&
                            <Label circular color="green">UNI</Label>
                        }
                        <br/>
                        <br/>
                        <Label size="huge" color="blue"> KRONOS: {employee.kronos} </Label>
                        <Label size="huge" color="teal"> POS: {employee.pos} </Label>
                        <br/>
                        <br/>
                        <p><strong>D.O.B:</strong> {formatDate(employee.dob)} </p>
                        <p><strong>Start Date:</strong> {formatDate(employee.startDate)} </p>
                        <p><strong>Email:</strong> {employee.email} </p>
                        <p><strong>Phone:</strong> {employee.phone} </p>
                        <p><strong>Emergency Contact:</strong> {employee.emergencyContact} </p>
                        <p><strong>Emergency Phone:</strong> {employee.emergencyPhone} </p>
                        <p><strong>Address:</strong> {employee.address}, {employee.suburb}, {employee.state}, {employee.postcode} </p>
                    </Item.Description>
                </Item.Content>
            </Item>
        </Item.Group>
    )
}

export default EmployeeSummary