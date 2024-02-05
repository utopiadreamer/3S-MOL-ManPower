import { Claim, Role } from "../constants/auth";
import { UserDTO } from "../models/UserDTO";

export function getCurrentUser() {
  const role = localStorage.getItem("CurrentRole");
  const user = new UserDTO();
  user.Name = "محمد شوقي احمد";
  user.ID = "1";
  user.Email = "m.shawky@3segypt.com";
  user.Claims = [];
  switch (role) {
    case Role.Researcher:
      user.Claims = [
        Claim.AddRequest,
        Claim.EditContract,
        Claim.DeleteContract,
      ];
      break;
    case Role.Reviewer:
      user.Claims = [
        Claim.EditContract,
        Claim.EditCode,
        Claim.EditEstablishment,
        Claim.EditWorker,
      ];
      break;
    case Role.DirectorateManager:
      user.Claims = [Claim.ApproveClearance];
      break;
    default:
      break;
  }
  return user;
}

export function getUsers() {
  const arr: UserDTO[] = [
    {
      ID: "1",
      Name: "محمد شوقي احمد",
      UserName: "moo-shoo",
      Email: "m.shawky@3segypt.com",
      Roles: [Role.Admin],
    },
    {
      ID: "2",
      Name: "كريم جمال",
      Email: "k.gamal@3segypt.com",
      UserName: "user1",
      Claims: [
        Claim.AddRequest,
        Claim.EditContract,
        Claim.DeleteContract,
      ],
      Roles: [Role.Researcher, Role.Reviewer],
    },
    {
      ID: "3",
      Name: "محمد عصام",
      UserName: "user2",
      Email: "m.essam@3segypt.com",
      Claims: [
        Claim.EditCode,
        Claim.EditWorker,
        Claim.EditEstablishment,
      ],
      Roles: [Role.Researcher, Role.ReportViewer],
    },
    {
      ID: "4",
      Name: "فادي جرجس",
      UserName: "user3",
      Email: "fady@3segypt.com",
      Roles: [Role.Reviewer, Role.CommitteeMember],
    }
  ];

  return arr;
}
