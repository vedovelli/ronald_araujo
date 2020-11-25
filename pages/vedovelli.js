import Axios from "axios";

function Vedovelli({ repos }) {
  return (
    <ul data-testid="repos">
      {repos.map((repo) => {
        return (
          <li data-testid="repo" key={repo.id}>
            {repo.id}
          </li>
        );
      })}
    </ul>
  );
}

export async function getServerSideProps(context) {
  const res = await Axios.get("https://api.github.com/users/vedovelli/repos");
  return {
    props: { repos: res.data },
  };
}

export default Vedovelli;
