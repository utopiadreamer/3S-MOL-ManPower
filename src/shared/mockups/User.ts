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
        Claim.AddContract,
        Claim.EditContract,
        Claim.DeleteContract,
      ];
      break;
    case Role.Reviewer:
      user.Claims = [
        Claim.EditContract,
        Claim.EditSettlement,
        Claim.EditWorkersRecord,
        Claim.EditClearance,
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
