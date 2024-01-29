import { Claim } from "../constants/auth";
import { getCurrentUser } from "../mockups/User";

export class AuthUtil {
  public static hasPermission(claim: Claim) {
    const user = getCurrentUser();
    return user.Claims.filter(i => i.toString() === claim.toString()).length > 0;
  }
}
