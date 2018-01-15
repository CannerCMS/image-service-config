import FirebaseService from "./FirebaseService";
import ImgurService from "./ImgurService";
import CannerService from "./CannerService";

export default function(config, payload) {
  const { service } = config;
  switch (service) {
    case "canner":
      return new CannerService(config, payload);
    case "imgur":
      return new ImgurService(config, payload);
    case "firebase":
    default:
      return new FirebaseService(config, payload);
  }
}
