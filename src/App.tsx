import {
  Button,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { getAnalytics } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { GrStatusGood } from "react-icons/Gr";
import { RxCrossCircled } from "react-icons/Rx";
import "./App.css";
import { getWaterCooler } from "./firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBTwCygIDQW6Jg_0dUIZJ-CKqbX69ThK2M",
  authDomain: "water-where-ah.firebaseapp.com",
  projectId: "water-where-ah",
  storageBucket: "water-where-ah.appspot.com",
  messagingSenderId: "19294380273",
  appId: "1:19294380273:web:008bd30821aaead7ec4950",
  measurementId: "G-D5WBY03LB3",
};

function App() {
  const [waterCooler, setWaterCoolers] = useState<any>([]); // Specify the type for waterCooler
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataFromServer = await getWaterCooler(db); // Call your getWaterCooler function
        setWaterCoolers(dataFromServer); // Update the state with fetched data
        console.log(dataFromServer);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  async function IsApproved(item: any) {
    const waterCoolerRef = await setDoc(
      doc(db, "watercoolers", item.id),
      {
        ...item,
        isApproved: 2,
      },
      { merge: true }
    );
    window.location.reload();
  }

  async function isNotApproved(item: any) {
    const waterCoolerRef = await setDoc(
      doc(db, "watercoolers", item.id),
      {
        ...item,
        isApproved: -1,
      },
      { merge: true }
    );
    window.location.reload();
  }

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Water Cooler</TableCaption>
          <Thead>
            <Tr>
              <Th>Bottle Friendly</Th>
              <Th>Cold</Th>
              <Th>Hot</Th>
              <Th>Meta Data</Th>
              <Th>Approval</Th>
              <Th>Working</Th>
              <Th>Latitutde</Th>
              <Th>Longitude</Th>
              <Th>Operator</Th>
              <Th>Remarks</Th>
              <Th>Child Friendly</Th>
              <Th>Report Count</Th>
              <Th>Approval</Th>
            </Tr>
          </Thead>
          {waterCooler
            .filter((item: any) => item.isApproved === 0)
            .map((item: any) => (
              <Tr key={item.id}>
                <Td>{item.bottleFriendly ? "true" : "false"}</Td>
                <Td>{item.hascold ? "true" : "false"}</Td>
                <Td>{item.hasHot ? "true" : "false"}</Td>
                <Td>{item.importMetadata}</Td>
                <Td>{item.isApproved}</Td>
                <Td>{item.isWorking ? "true" : "false"}</Td>
                <Td>{item.location._lat}</Td>
                <Td>{item.location._long}</Td>
                <Td>{item.operator}</Td>
                <Td>{item.remarks}</Td>
                <Td>{item.reportCount}</Td>
                <Td>{item.wheelchairFriendly}</Td>
                <Td>
                  <Stack direction="row" spacing={1}>
                    <Button
                      width={"5px"}
                      paddingRight={"10px"}
                      leftIcon={<GrStatusGood />}
                      colorScheme="green"
                      variant="solid"
                      onClick={() => IsApproved(item)}
                    ></Button>
                    <Button
                      width={"5px"}
                      paddingLeft={"9px"}
                      rightIcon={<RxCrossCircled />}
                      colorScheme="red"
                      variant="solid"
                      onClick={() => isNotApproved(item)}
                    ></Button>
                  </Stack>
                </Td>
              </Tr>
            ))}
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
