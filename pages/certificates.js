import {Segment, Icon, Header, Button} from 'semantic-ui-react'
import Link from 'next/link'


function Certificates() {
    return (
        <>
            <Link href="/rsa">
                <Segment 
                    textAlign="center"
                    size="massive"
                    inverted
                    color="blue"
                >
                <Icon name="glass martini"/>
                RSA
                </Segment>
            </Link>

            <Link href="/firstaid">
                <Segment 
                    textAlign="center"
                    size="massive"
                    inverted
                    color="green"
                >
                <Icon name="medkit"/>
                First Aid
                </Segment>
            </Link>

            <Link href="/firewarden">
                <Segment 
                    textAlign="center"
                    size="massive"
                    inverted
                    color="red"
                >
                <Icon name="fire extinguisher"/>
                Fire Warden
                </Segment>
            </Link>

            <Link href="/foodsaftey">
                <Segment 
                    textAlign="center"
                    size="massive"
                    inverted
                    color="yellow"
                >
                <Icon name="utensils"/>
                Food Saftey
                </Segment>
            </Link>

            <Link href="/wwcc">
                <Segment 
                    textAlign="center"
                    size="massive"
                    inverted
                    color="teal"
                >
                <Icon name="child"/>
                WWCC
                </Segment>
            </Link>
        </>
    )
}

export default Certificates