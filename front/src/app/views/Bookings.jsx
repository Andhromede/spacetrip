import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux-store/authenticationSlice";
import { URL_CONTACT, URL_DESTINATIONS } from "../constants/urls/urlFrontEnd";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image} from "@react-pdf/renderer";

// Requete API
import { getBookingByIdUser } from "./../api/backend/booking";
import { getRatesByHousing } from "../api/backend/rate";
// Icone & style
import logo from "../assets/images/general/logo.png";
import { BsFillCalendar2DateFill, BsPerson, BsArrowDownCircleFill } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import { AiFillStar, AiOutlineStar, AiOutlineFilePdf } from "react-icons/ai";
import { Tooltip, Button } from "@material-tailwind/react";
import { TbLoaderQuarter } from "react-icons/tb";


const Bookings = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [averageStar, setAverageStar] = useState(0);
  const [tabRates, setTabRates] = useState([]);
  const userId = useSelector((state) => state.auth?.user?.id);
  const token = useSelector((state) => state.auth?.token);

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#f0f0f0",
      lineHeight: "1.5px",
    },
    section: {
      margin: "8px",
      padding: "8px",
    },
    text: {
      fontSize: "14px",
    },
    title: {
      color: "#6B21A8",
      textAlign: "center",
      marginTop: "140px",
      padding: "20px",
      fontSize: "32px",
    },
    sectionUser: {
      position: "absolute",
      top: 10,
      right: 5,
      lineHeight: "1.8px",

    },
    user: {
      fontSize: "12px",
    },
    container: {
      lineHeight: "1.8px",
      padding: "15px",
      display: "flex",
      marginLeft: "20px",
      marginRight: "20px",
      flexDirection: "row",
      borderColor: "#262626",
      borderStyle: "solid",
      borderWidth: "1px",
      backgroundColor: "#d6d6d6",
      justifyContent: "space-around",
    },
    image: {
      width: "40%",
      borderRadius: "10%",
      marginBottom: "5px",
    },
    mini: {
      fontSize: "10px",
    },
    sectionBooking: {
      position: "absolute",
      top: 5,
      left: 5,
    },
  });

  useEffect(() => {
    getBookingByIdUser(userId, token)
      .then((res) => {
        setData(res.data);
        res.data.map((booking) => {
          booking.housing.map((housing) => {
            getRatesByHousing(housing._id)
              .then((comments) => {
                comments.data.map((comment) => tabRates.push(comment.rate));
                let result = 0;
                tabRates.map((note) => (result += note));
                result = Math.floor(result / tabRates.length);
                setAverageStar(result);
              })
              .catch((err) => console.log(err));
          });
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(signOut());
        }
        console.log(err);
      });
  }, []);

  // TO DO ajout loader
  if (!data) return <div className="text-terciary flex justify-center p-4 title-jedi text-4xl items-center"> <TbLoaderQuarter className="animate-spin h-5 w-5 mr-3 text-orange text-4xl"/> Chargement</div>
  return (
    <>
      <div className="text-white mx-auto mt-20">
        {data.length == 0 ? (
          <><h1 className="m-6 text-white title-jedi text-4xl underline decoration-solid py-5">
            Pour le moment, vous n'avez aucune réservation <br />
          </h1>
          <div className="text-center">
          <div className="flex justify-center pb-2 "> <BsArrowDownCircleFill className="m-10 animate-bounce text-orange text-4xl"/></div>
            <Link className="hover:animate-none p-4 border-2 border-terciary-light animate-pulse text-3xl text-terciary font-Varino hover:font-semibold" to={URL_DESTINATIONS}>
              Venez découvrir nos destinations
            </Link>
          </div>
          </>
        ) : (
          <h1 className="text-white title-jedi text-4xl underline decoration-solid py-5 ">
            mes réservations
          </h1>
        )}
        <div className="">
          
          {data.map((userBooking) => {
            return (
              <div
                key={userBooking._id}
                className=" mx-14 my-14 border-2 border-gray-400 rounded-xl flex h-auto transition ease-in-out delay-300 hover:scale-105 hover:bg-neutral-800 duration-300"
              >
                <div className="flex w-full">
                  {userBooking.housing.map((booking) => {
                    userBooking.bookingDate = new Date(userBooking.bookingDate)
                      .toISOString()
                      .slice(0, 10);
                    userBooking.startDate = new Date(userBooking.startDate)
                      .toISOString()
                      .slice(0, 10);
                    userBooking.endDate = new Date(userBooking.endDate)
                      .toISOString()
                      .slice(0, 10);
                    return (
                      <div key={booking._id} className="flex">
                          <img
                            className="h-[230px] w-[300px] object-cover rounded-lg "
                            src={booking.picture[0].path}
                            alt={`image de ${booking.name}`}
                          />

                        <div className="pl-7 flex flex-col">                      
                          <Link to={`/logement/${booking._id}`}><h2 className="text-3xl"> {booking.name}</h2></Link>
                          <div className="my-1 text-cyan-300">
                            <Tooltip
                              className="w-64 text-center p-2"
                              content={booking.description}
                              placement="bottom"
                            >
                              <p className="my-2">Description :</p>
                            </Tooltip>
                            <p>{booking.description.substr(0, 44) + "..."}</p>
                          </div>
                          <p className="my-2 flex items-center gap-1">
                            {" "}
                            <BsPerson /> {userBooking.nbPersons}
                          </p>
                          <p className=" flex gap-2 items-center">
                            <BsFillCalendar2DateFill /> Du{" "}
                            <span className="text-cyan-300">
                              {userBooking.startDate
                                .substr(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")}
                            </span>
                            au
                            <span className="text-cyan-300">
                              {userBooking.endDate
                                .substr(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  <div className="h-full flex flex-col justify-between px-5 ">
                    {averageStar > 0 && (
                      <div className="text-quaternary text-2xl my-2">
                        {" "}
                        {averageStar == 1 && (
                          <div className=" flex gap-0.5 ">
                            <AiFillStar /> <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                          </div>
                        )}
                        {averageStar == 2 && (
                          <div className=" flex gap-0.5 ">
                            <AiFillStar /> <AiFillStar /> <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                          </div>
                        )}
                        {averageStar == 3 && (
                          <div className="flex gap-0.5">
                            <AiFillStar /> <AiFillStar /> <AiFillStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                          </div>
                        )}
                        {averageStar == 4 && (
                          <div className="flex gap-0.5">
                            <AiFillStar /> <AiFillStar /> <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                          </div>
                        )}
                        {averageStar == 5 && (
                          <div className="flex gap-0.5">
                            <AiFillStar /> <AiFillStar /> <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="">
                      <p className="text-end text-5xl py-2">
                        {userBooking.totalPrice.toLocaleString()}€
                      </p>
                      <Tooltip
                        className="p-2"
                        content="Modifier ma réservation"
                        placement="bottom"
                      >
                        <Link to={URL_CONTACT}>
                          <Button
                            className="transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-105 hover:bg-neutral-900 duration-300"
                            variant="gradient"
                          >
                            <TfiWrite className="text-xl text-rose-300" />
                          </Button>
                        </Link>
                      </Tooltip>
                      <Tooltip
                        className="p-2"
                        content="Télechargez ma facture"
                        placement="bottom"
                      >
                        <Button
                          className="transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-105 hover:bg-neutral-900 duration-300"
                          variant="gradient"
                        >
                          {userBooking && (
                            <PDFDownloadLink
                              document={
                                <Document>
                                  <Page size="A4" style={styles.page}>
                                    <View style={styles.section}>
                                      <Text style={styles.title}>Facture</Text>
                                    </View>

                                    <View style={styles.sectionUser}>
                                      <Text style={styles.user}>
                                        {userBooking.user.email}{" "}
                                      </Text>
                                      <Text>
                                        {userBooking.user.firstName && (
                                          <Text style={styles.user}>
                                            {userBooking.user.firstName}
                                          </Text>
                                        )}
                                        {userBooking.user.lastName && (
                                          <Text style={styles.user}>
                                            {" " + userBooking.user.lastName}
                                          </Text>
                                        )}
                                      </Text>
                                      {userBooking.user.phone && (
                                        <Text style={styles.user}>
                                          {userBooking.user.phone}{" "}
                                        </Text>
                                      )}
                                      {userBooking.user.adress && (
                                        <Text style={styles.user}>
                                          {userBooking.user.adress}{" "}
                                        </Text>
                                      )}
                                      <Text>
                                        {userBooking.user.zipCode && (
                                          <Text style={styles.user}>
                                            {userBooking.user.zipCode}{" "}
                                          </Text>
                                        )}
                                        {userBooking.user.city && (
                                          <Text style={styles.user}>
                                            {userBooking.user.city}{" "}
                                          </Text>
                                        )}
                                      </Text>
                                      {userBooking.user.country && (
                                        <Text style={styles.user}>
                                          {userBooking.user.country}{" "}
                                        </Text>
                                      )}
                                    </View>
                                    <View style={styles.sectionBooking}>
                                      <Image style={styles.image} src={logo} />
                                      <Text style={styles.mini}>
                                        N° de votre réservation :{" "}
                                        {userBooking._id}
                                      </Text>
                                      <Text style={styles.mini}>
                                        Date de réservation :{" "}
                                        {userBooking.bookingDate}
                                      </Text>
                                    </View>
                                    <View style={styles.container}>
                                      {userBooking.housing.map((housing) => {
                                        return (
                                          <View
                                            style={styles.section}
                                            key={housing._id}
                                          >
                                            {/* {console.log(`../${housing.picture[0].path}`)} */}
                                            {/* TODO IMAGE LOGEMENT */}
                                            {/* <Image style={styles.image} src={`../${housing.picture[0].path}`} /> */}
                                            <Text style={styles.text}>
                                              {housing.name}
                                            </Text>
                                            <Text style={styles.mini}>
                                              ID : {housing._id}
                                            </Text>
                                            <Text style={styles.text}>
                                              Destination:{" "}
                                              {housing.destination.name}
                                            </Text>
                                          </View>
                                        );
                                      })}

                                      <View style={styles.section}>
                                          <Text style={styles.text}>
                                            Séjour du {userBooking.startDate} au {userBooking.endDate}
                                          </Text>
                                        <Text style={styles.text}>
                                          Prix total : {userBooking.totalPrice}{" "}
                                          €
                                        </Text>
                                        {userBooking.paymentDate && (
                                          <Text style={styles.text}>
                                            Date du paiement :{" "}
                                            {userBooking.paymentDate}
                                          </Text>
                                        )}
                                        <Text style={styles.text}>
                                          Nombre de voyageurs : {userBooking.nbPersons}
                                        </Text>
                                        <Text style={styles.text}>
                                          Premium :
                                          {userBooking.premium
                                            ? " Oui"
                                            : " Non"}
                                        </Text>
                                      </View>
                                    </View>
                                  </Page>
                                </Document>
                              }
                              fileName="Facture.pdf"
                            >
                              <AiOutlineFilePdf className="text-xl text-rose-300" />
                            </PDFDownloadLink>
                          )}
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>

    </>
  );
};

export default Bookings;
