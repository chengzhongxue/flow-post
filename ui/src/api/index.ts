import { axiosInstance } from "@halo-dev/api-client";
import {
  FollowV1alpha1Api,
  ApiFlowPostKunkunyuComV1alpha1FollowApi,

} from "./generated";

const flowPostCoreApiClient = {
  follow: new FollowV1alpha1Api(undefined, "", axiosInstance),
}

const flowPostApiClient = {
  follow: new ApiFlowPostKunkunyuComV1alpha1FollowApi(undefined, "", axiosInstance),
}


export { flowPostCoreApiClient, flowPostApiClient};
