import { useState, useEffect } from "react";
import { Spinner, Alert } from "reactstrap";
import useEth from "../../contexts/EthContext/useEth";
import PetCard from "./PetCard";

const PetContainer = ({ pets }) => {
  const [adopters, setAdopters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAdopted, setHasAdopted] = useState(false);

  const {
    state: { contract, accounts },
  } = useEth();

  const GetAdopters = async () => {
    const adoptersArray = await contract.methods
      .getAdopters()
      .call({ from: accounts[0] });
    return adoptersArray;
  };

  const handleAdopt = (petId) => {
    console.log("handle adopt was called. " + petId);
    adopt(petId);
  };

  const adopt = async (petId) => {
    await contract.methods.adopt(petId).send({ from: accounts[0] });
  };

  const listItems = pets.map((pet) => (
    <li key={pet.id} style={{ float: "left", margin: "10px" }}>
      <PetCard pet={pet} adopters={adopters} handleAdopt={handleAdopt} />
    </li>
  ));

  useEffect(() => {
    if (accounts) {
      (async () => {
        setIsLoading(true);
        let result = await GetAdopters();
        setAdopters(result);
      })();
      setIsLoading(false);
    }
  }, [accounts]);

  if (isLoading) {
    return (
      <>
        <Spinner>Loading...</Spinner>
      </>
    );
  } else {
    let result = false;
    result = adopters.every((address) => {
      return address !== accounts[0];
    });
    return (
      <>
        {!result ? (
          <Alert>
            <h4 className="alert-heading">Well done!</h4>
            <p>You have adopted pets.</p>
          </Alert>
        ) : (
          <Alert color="danger">
            <h4 className="alert-heading">Hmm!</h4>
            <p>You haven't adopted any pets yet.</p>
            <hr />
            <p>ProTip : Try adopt a pet and refresh the page.</p>
          </Alert>
        )}
        <ul style={{ clear: "both", listStyle: "none" }}>{listItems}</ul>
      </>
    );
  }
};

export default PetContainer;
