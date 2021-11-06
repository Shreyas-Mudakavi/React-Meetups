//   page -- "/our-domain/[meetupId]"

import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://user_shreyas:Zs6blL56pz6sriYU@cluster0.kfylt.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // _id: 1 means only include the id but no other field values

  client.close();

  return {
    //fallback: false, // if user enters any other meetupId that is not in the paths array, a 404 page will be shown
    fallback: "blocking", // setting fallback to true or 'blocking' you are telling nextJS that the list of paths which you are specifing here might not be exahaustive there might be more valid pages
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;
  // that will be an object where our identifiers between
  // the saquare brackets
  // will be properties  and the values will be the actual values encoded in the url
  // 'meetupId' because that what I have between the square brackets

  // console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://user_shreyas:Zs6blL56pz6sriYU@cluster0.kfylt.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedmeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedmeetup._id.toString(),
        image: selectedmeetup.image,
        title: selectedmeetup.title,
        address: selectedmeetup.address,
        description: selectedmeetup.description,
      },
    },
  };
}

export default MeetupDetails;
