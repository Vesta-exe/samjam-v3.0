import fetch from "isomorphic-unfetch";
import baseUrl from "../../../utils/baseUrl";
import {
  Item,
  Button,
  Icon,
  Header,
  Segment,
  Loader,
  Confirm,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFetchUser } from "../../../utils/user";
import Router from "next/router";

function Meeting({ meetingData }) {
  const { user, loading } = useFetchUser();

  const meeting = meetingData;

  if (!user && !loading) {
    Router.push("/");
  }

  const [confirm, setConfirm] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isDeleting) {
      deleteMeeting();
    }
  }, [isDeleting]);

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteMeeting = async () => {
    const meetingId = router.query.id;
    try {
      const deleted = await fetch(`${baseUrl}/api/meeting/${meetingId}`, {
        method: "DELETE",
      });
      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  };

  return (
    <>
      <Header as="h2" block>
        <Icon name="comment alternate" color="violet" />
        Meeting Type
      </Header>
      {isDeleting ? (
        <Loader active />
      ) : (
        <Segment raised>
          <Item.Group>
            <Item>
              <Item.Content>
                <p>
                  <strong>Meeting Type: </strong>
                  {meeting.name}
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
          <Link href="/admin">
            <Button color="blue" icon labelPosition="left">
              <Icon name="arrow left" />
              Back
            </Button>
          </Link>
          <Button color="red" onClick={open} icon labelPosition="left">
            <Icon name="trash" />
            Delete
          </Button>
        </Segment>
      )}
      <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
    </>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const meeting = await fetch(`${baseUrl}/api/meeting/${id}`);
  const { meetingData } = await meeting.json();
  return { props: { meetingData } };
}

export default Meeting;
