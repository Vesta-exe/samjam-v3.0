import { Grid, Segment } from "semantic-ui-react";

function Dashboard() {
  return (
    <>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Segment raised textAlign="center" color="blue">
              <h2>Current Safe Code</h2>
              <h2>095678</h2>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment raised textAlign="center" color="blue">
              <h2>Armorguard Safe</h2>
              <h2>45 80 32</h2>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment raised textAlign="center" color="blue">
              <h2>Intencity MOD Safe</h2>
              <h2>56 81 29</h2>
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Segment raised textAlign="center" color="blue">
              <h2>Intencity Staff Safe</h2>
              <h2>78 40 53</h2>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment raised textAlign="center" color="blue">
              <h2>BIO Door Code</h2>
              <h2>"C" 27XZ</h2>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment raised textAlign="center" color="blue">
              <h2>Cinema 1 Projector</h2>
              <h2>"C" 127Y</h2>
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Segment raised textAlign="center" color="blue">
              <h2>Snow Login</h2>
              <h2>User: General</h2>
              <h2>Password: Village1</h2>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment raised textAlign="center" color="blue">
              <h2>TO Door Code</h2>
              <h2>982E</h2>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment raised textAlign="center" color="blue">
              <h2>IT Critial Number</h2>
              <h2>(03) 9281 1012</h2>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment raised textAlign="center" color="blue">
              <h2>Nicole - Intercard</h2>
              <h2>0434657499</h2>
              <h2>0408380698</h2>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default Dashboard;
