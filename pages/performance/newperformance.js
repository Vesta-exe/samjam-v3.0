import React from "react";
import {
  Form,
  Input,
  Button,
  TextArea,
  Header,
  Icon,
  Select,
  Loader,
} from "semantic-ui-react";
import baseUrl from "../../utils/baseUrl";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFetchUser } from "../../utils/user";
import Router from "next/router";

const typeOptions = [
  { key: "Positive", text: "Positive", value: "Positive" },
  { key: "Negative", text: "Negative", value: "Negative" },
  { key: "Sick", text: "Sick", value: "Sick" },
  { key: "Cashhandling", text: "Cash Handling", value: "Cash Handling" },
  { key: "Meeting", text: "Meeting", value: "Meeting" },
];

function NewPerformance({
  employeeData,
  positiveData,
  negativeData,
  sickData,
  cashhandlingData,
  meetingData,
}) {
  const { user, loading } = useFetchUser();

  if (!user && !loading) {
    Router.push("/");
  }

  const [form, setForm] = React.useState({
    manager: "",
    employee: "",
    date: "",
    type: "",
    category: "",
    description: "",
  });
  const [isSubmitting, setIsSubmiting] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const router = useRouter();

  const isPositive = form.type === "Positive";
  const isNegative = form.type === "Negative";
  const isSick = form.type === "Sick";
  const isCashhandling = form.type === "Cash Handling";
  const isMeeting = form.type === "Meeting";

  React.useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createPerformance();
      } else {
        setIsSubmiting(false);
      }
    }
  });

  const createPerformance = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/performance`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/performance");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e, data) => {
    setForm({
      ...form,
      [data.name]: data.value,
    });
    console.log(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmiting(true);
  };

  const validate = () => {
    let err = {};

    if (!form.manager) {
      err.manager = "Manager is required";
    }
    if (!form.employee) {
      err.employee = "Employee is required";
    }
    if (!form.date) {
      err.date = "Date is required";
    }
    if (!form.type) {
      err.type = "Type is required";
    }
    if (!form.incident) {
      err.incident = "Incident Type is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }
    return err;
  };

  const employeeOptions = employeeData.map((employee) => {
    return {
      key: employee.name,
      value: employee._id,
      text: employee.name,
    };
  });

  const positiveOptions = positiveData.map((positive) => {
    return {
      key: positive.name,
      value: positive.name,
      text: positive.name,
    };
  });

  const negativeOptions = negativeData.map((negative) => {
    return {
      key: negative.name,
      value: negative.name,
      text: negative.name,
    };
  });

  const sickOptions = sickData.map((sick) => {
    return {
      key: sick.name,
      value: sick.name,
      text: sick.name,
    };
  });

  const cashhandlingOptions = cashhandlingData.map((cashhandling) => {
    return {
      key: cashhandling.name,
      value: cashhandling.name,
      text: cashhandling.name,
    };
  });

  const meetingOptions = meetingData.map((meeting) => {
    return {
      key: meeting.name,
      value: meeting.name,
      text: meeting.name,
    };
  });

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="green" />
        Add New Performance Note
      </Header>
      {isSubmitting ? (
        <Loader active inline="centered" />
      ) : (
        <Form onSubmit={handleSubmit}>
          <h3 className="form-required">All fields are required</h3>
          <Form.Field
            control={Input}
            error={
              errors.manager
                ? { content: "Please enter a Manager", pointing: "below" }
                : null
            }
            name="manager"
            label="Manager"
            placeholder="Manager"
            onChange={handleChange}
          />
          <Form.Field
            control={Select}
            error={
              errors.employee
                ? { content: "Please enter a Employee", pointing: "below" }
                : null
            }
            name="employee"
            label="Employee"
            placeholder="Employee"
            search
            options={employeeOptions}
            onChange={handleSelectChange}
          />
          <Form.Field
            control={Input}
            error={
              errors.date
                ? { content: "Please enter a date", pointing: "below" }
                : null
            }
            name="date"
            label="Date"
            placeholder="Date"
            type="date"
            onChange={handleChange}
          />
          <Form.Field
            control={Select}
            label="Type"
            name="type"
            search
            options={typeOptions}
            placeholder="Type"
            onChange={handleSelectChange}
          />
          {isPositive && (
            <Form.Field
              control={Select}
              label="Category"
              name="incident"
              search
              options={positiveOptions}
              placeholder="Category"
              onChange={handleSelectChange}
            />
          )}
          {isNegative && (
            <Form.Field
              control={Select}
              label="Category"
              name="incident"
              search
              options={negativeOptions}
              placeholder="Category"
              onChange={handleSelectChange}
            />
          )}
          {isSick && (
            <Form.Field
              control={Select}
              label="Category"
              name="incidient"
              search
              options={sickOptions}
              placeholder="Category"
              onChange={handleSelectChange}
            />
          )}
          {isCashhandling && (
            <Form.Field
              control={Select}
              label="Category"
              name="incident"
              search
              options={cashhandlingOptions}
              placeholder="Category"
              onChange={handleSelectChange}
            />
          )}
          {isMeeting && (
            <Form.Field
              control={Select}
              label="Category"
              name="incident"
              search
              options={meetingOptions}
              placeholder="Category"
              onChange={handleSelectChange}
            />
          )}
          <Form.Field
            control={TextArea}
            error={
              errors.description
                ? { content: "Please enter a Description", pointing: "below" }
                : null
            }
            name="description"
            label="Description"
            placeholder="Description"
            onChange={handleChange}
          />
          <Link href="/performance">
            <Button
              color="red"
              icon
              labelPosition="left"
              floated="right"
              aria-label="Cancel"
            >
              <Icon name="cancel" />
              Cancel
            </Button>
          </Link>
          <br />
          <br />
          <Form.Field
            floated="right"
            control={Button}
            color="green"
            icon="pencil alternate"
            content="Submit"
            type="submit"
            aria-label="Submit"
          />
        </Form>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const employees = await fetch(`${baseUrl}/api/employees`);
  const positives = await fetch(`${baseUrl}/api/positive`);
  const negatives = await fetch(`${baseUrl}/api/negative`);
  const sicks = await fetch(`${baseUrl}/api/sick`);
  const cashhandlings = await fetch(`${baseUrl}/api/cashhandling`);
  const meetings = await fetch(`${baseUrl}/api/meeting`);
  const { employeeData } = await employees.json();
  const { positiveData } = await positives.json();
  const { negativeData } = await negatives.json();
  const { sickData } = await sicks.json();
  const { cashhandlingData } = await cashhandlings.json();
  const { meetingData } = await meetings.json();

  return {
    props: {
      employeeData,
      positiveData,
      negativeData,
      sickData,
      cashhandlingData,
      meetingData,
    },
  };
}

export default NewPerformance;
