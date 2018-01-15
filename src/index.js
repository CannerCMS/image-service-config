import FirebaseService from "./FirebaseService";
import ImgurService from "./ImgurService";
import CannerService from "./CannerService";

export default function(config, payload) {
  const { service } = config;
  switch (service) {
    case "firebase":
      return new FirebaseService(config, payload);
    case "imgur":
      return new ImgurService(config, payload);
    case "canner":
    default:
      return new CannerService(config, payload);
  }
}
