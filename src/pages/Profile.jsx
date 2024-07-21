import BusinessInfo from "../components/Profile/Snippets/BusinessInfo";
import MyProducts from "../components/Profile/Snippets/Products";
import MyOrders from "../components/Profile/Snippets/Orders/Section";

function Profile() {
    return (
        <>
            <section>
                <div className="container-fluid">
                    {/* business info */}
                    <BusinessInfo />
                    <br/>
                    <br/>
                    {/* my products */}
                    <MyProducts />
                    <br/>
                    <br/>
                    {/* my orders */}
                    <MyOrders />
                </div>
            </section>
        </>
    );
}

export default Profile;