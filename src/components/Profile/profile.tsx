import { Fragment, FunctionComponent } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { instanceAxios } from "../../services/axios";
import Repos from "../Repos/repos";
import Starred from "../Starred/starred";
import { Card } from "./style";

type User = {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
};

const Profile: FunctionComponent = () => {
  const { login } = useParams();

  const { data, isFetching } = useQuery<User>("profile", async () => {
    const { data } = await instanceAxios.get(`/users/${login}`);
    return data;
  });

  return (
    <Fragment>
      {isFetching && <p>Loading...</p>}
      {!isFetching && (
        <Fragment>
          <Card>
            <img
              src={data?.avatar_url}
              className="w-16 h-16 rounded-full mr-6"
            />
            <div>
              <h3>{data?.login}</h3>
              <h4 className="mt-1 text-gray-400">{data?.name}</h4>
              <p className="mt-4">{data?.bio}</p>
            </div>
            <div>
              <button>repos</button>
              <button>starred</button>
            </div>
          </Card>
          <Repos userId={data?.login} />
          <Starred userId={data?.login} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
