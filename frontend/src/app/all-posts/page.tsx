import {} from "react";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import NavBar from "../components/NavBar/NavBar";

function AllPosts() {
  return (
    <>
      <PageWrapper>
        <NavBar />
        <hr className="md:max-w-screen-xl mx-auto my-3 bg-foreground rounded h-1" />
      </PageWrapper>
    </>
  );
}

export default AllPosts;