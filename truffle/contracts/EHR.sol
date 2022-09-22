// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EHR { 
  // Constants
  string constant NO_EXISTS_SENDER_ERROR = "Sender does not exist";
  string constant NO_EXISTS_PATIENT_ERROR = "Patient does not exist";
  string constant NO_DOCTOR_ROLE_ERROR = "Sender is not a doctor";
  string constant EXISTS_PATIENT_ERROR = "This patient already exists.";
  string constant EXISTS_DOCTOR_ERROR = "This doctor already exists.";
  string constant EXISTS_RECORD_ERROR = "The record with this ID already exists.";

  string constant DOCTOR_ROLE = "doctor";
  string constant PATIENT_ROLE = "patient";
  string constant UNKNOWN_ROLE = "unknown";



  // Models
  struct Record { 
    string id;
    string filename; 
    address patientId;
    address doctorId;
    uint256 createdAt;
  }

  struct Patient {
    address id;
    mapping (string => Record) records;
  }

  struct Doctor {
    address id;
  }

  // Mappings & Events
  mapping (address => Patient) public patients;
  mapping (address => Doctor) public doctors;

  event RecordAdded(string id, address patientId, address doctorId); 
  event PatientAdded(address patientId);
  event DoctorAdded(address doctorId);

  // Modifiers
  modifier senderExists {
    require(
      doctors[msg.sender].id == msg.sender || patients[msg.sender].id == msg.sender,
      NO_EXISTS_SENDER_ERROR
    );
    _;
  }

  modifier patientExists(address patientId) {
    require(patients[patientId].id == patientId, NO_EXISTS_PATIENT_ERROR);
    _;
  }

  modifier senderIsDoctor {
    require(doctors[msg.sender].id == msg.sender, NO_DOCTOR_ROLE_ERROR);
    _;
  }

  // Functions
  function addPatient(address _patientId) public senderIsDoctor {
    require(patients[_patientId].id != _patientId, EXISTS_PATIENT_ERROR);
    patients[_patientId].id = _patientId;

    emit PatientAdded(_patientId);
  }

  function addDoctor() public {
    require(doctors[msg.sender].id != msg.sender, EXISTS_DOCTOR_ERROR);
    doctors[msg.sender].id = msg.sender;

    emit DoctorAdded(msg.sender);
  }

  function addRecord(string memory _id, string memory _filename, address _patientId) public senderIsDoctor patientExists(_patientId) {
    require(
      patients[_patientId].records[_id].createdAt == 0,
      EXISTS_RECORD_ERROR
    );

    Record memory record = Record(_id, _filename, _patientId, msg.sender, block.timestamp); 
    patients[_patientId].records[_id] = record; 

    emit RecordAdded(_id, _patientId, msg.sender); 
  } 

  function getRecord(string memory _id, address _patientId) public view senderExists patientExists(_patientId) returns (string memory, string memory, address, address, uint256) { 
    Record memory record = patients[_patientId].records[_id]; 
    return (record.id, record.filename, record.patientId, record.doctorId, record.createdAt); 
  }

  function getSenderRole() public view returns (string memory) {
    if (doctors[msg.sender].id == msg.sender) {
      return DOCTOR_ROLE;
    } else if (patients[msg.sender].id == msg.sender) {
      return PATIENT_ROLE;
    } else {
      return UNKNOWN_ROLE;
    }
  }
} 
