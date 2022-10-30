// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EHR { 
  // Models
  struct Record { 
    string id;
    string filename; 
    address idPatient;
    address idDoctor;
    uint256 createdAt;
  }
  
  struct Doctor {
    address id;
  }

  struct Patient {
    address id;
    Record[] records;
  }


  // Mappings & Events
  mapping (address => Patient) public patients;
  mapping (address => Doctor) public doctors;

  event RecordAdded(string id, address idPatient, address idDoctor); 
  event PatientAdded(address idPatient);
  event DoctorAdded(address idDoctor);

  // Modifiers
  modifier senderExists {
    require(
      doctors[msg.sender].id == msg.sender || patients[msg.sender].id == msg.sender,
      "El remitente no existe"
    );
    _;
  }

  modifier patientExists(address idPatient) {
    require(
      patients[idPatient].id == idPatient,
      "El paciente no existe"
    );
    _;
  }

  modifier senderIsDoctor {
    require(
      doctors[msg.sender].id == msg.sender,
      "El remitente no es un doctor"
    );
    _;
  }

  // Functions
  function addPatient(address _idPatient) public senderIsDoctor {
    require(
      patients[_idPatient].id != _idPatient,
      "El paciente con este ID ya existe"
    );
    patients[_idPatient].id = _idPatient;

    emit PatientAdded(_idPatient);
  }

  function addDoctor() public {
    require(
      doctors[msg.sender].id != msg.sender,
      "El doctor con este ID ya existe"
    );
    doctors[msg.sender].id = msg.sender;

    emit DoctorAdded(msg.sender);
  }

  function addRecord(string memory _id, string memory _filename, address _idPatient) public senderIsDoctor patientExists(_idPatient) {
    Record memory record = Record(_id, _filename, _idPatient, msg.sender, block.timestamp);
    patients[_idPatient].records.push(record);

    emit RecordAdded(_id, _idPatient, msg.sender); 
  }

  function getRecords(address _idPatient) public view senderExists patientExists(_idPatient) returns (Record[] memory) {
    return patients[_idPatient].records;
  } 

  function getSenderRole() public view returns (string memory) {
    if (doctors[msg.sender].id == msg.sender) {
      return "doctor";
    } else if (patients[msg.sender].id == msg.sender) {
      return "patient";
    } else {
      return "unknown";
    }
  }

  function getPatientExists(address _idPatient) public view senderIsDoctor returns (bool) {
    return patients[_idPatient].id == _idPatient;
  }
} 
