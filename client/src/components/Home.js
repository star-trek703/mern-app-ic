const Home = ({ isLoggedIn, user }) => {
  return (
    <div className="container">
      <div className="bg-white text-gray-900 text-lg mt-5 px-7 py-5 rounded shadow">

        { isLoggedIn
        ? (
          <>
            <h3 className="text-gray-900 text-2xl">Profile</h3>

            <div className="text-gray-700">
              <div className="mt-5">
                <span className="">Name:</span> <br />
                <span>{ user.name }</span>
              </div>
              <div className="mt-5">
                <span className="">Email:</span> <br />
                <span>{ user.email }</span>
              </div>
            </div>
          </>
        )
        : (
          "You're not logged in. Login to see your profile."
        ) }
      </div>
    </div>
  )
}

export default Home