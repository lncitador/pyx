import React from 'react';
import CarrierData from './carrierData';
import CreateVehicle from './createVehicle';
import FindCNPJ from './findCnpj';
import SearchPlateForm from './searchPlateForm';

import { Container } from './styles';
import SubmitSurvey from './submitSurvey';

const _Survey: React.FC = () => {
  const searchFounded = false;
  const loadingCarrierData = false;
  return (
    <Container>
      <SearchPlateForm />
      {!searchFounded ? (
        <>
          <CreateVehicle />
          <FindCNPJ />
          <SubmitSurvey />
        </>
      ) : (
        <></>
      )}
      {loadingCarrierData && searchFounded ? (
        <>
          <CarrierData />
          <SubmitSurvey />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default _Survey;
