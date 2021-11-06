// main page -- "/"

import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

//import { useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "NextJS Meetup",
//     address: "New York",
//     description: "NextJS Meetup",
//     image:
//       "https://static.onecms.io/wp-content/uploads/sites/28/2021/02/19/new-york-city-evening-NYCTG0221.jpg",
//   },
//   {
//     id: "m2",
//     title: "NextJS Meetup 2",
//     address: "California",
//     description: "NextJS Meetup 2",
//     image:
//       "https://ca-times.brightspotcdn.com/dims4/default/20b69ad/2147483647/strip/true/crop/3000x1999+0+0/resize/1486x990!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F90%2Fca%2F3f5a603a4c6fa7446aa9bf23d25a%2Fla-photos-1staff-528802-me-macarthur-1-rcg.JPG",
//   },
// ];

const HomePage = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // send http request to get data from the server
  //   // we can use the data to set the state like eg. setLoadedMeetups(data)
  //   // 'data' is meetups, the response from the server

  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, [])

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from the server/api/backend

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from the server/api/backend

  const client = await MongoClient.connect(
    "mongodb+srv://user_shreyas:Zs6blL56pz6sriYU@cluster0.kfylt.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        description: meetup.description,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, // revalidate after 1 second
  };
}

export default HomePage;
