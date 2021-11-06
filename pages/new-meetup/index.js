//  page -- "/our-domain/new-meetup"

import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";
//import { useState } from "react";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";
//import LoadingSpinner from "../../components/ui/LoadingSpinner";

const NewMeetUpPage = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Create Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </Fragment>
  );
};

export default NewMeetUpPage;
