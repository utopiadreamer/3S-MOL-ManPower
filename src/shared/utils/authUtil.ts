import { Claim } from "../constants/auth";
import { getCurrentUser } from "../mockups/User";

export class AuthUtil {
  public static hasClaim(claim: Claim) {
    const user = getCurrentUser();
    return (user?.Claims?.filter(i => i.toString() === claim.toString()).length ?? 0) > 0;
  }
}
