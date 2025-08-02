import ParticlesBg from "particles-bg";
import { faPassport , faExchange , faRightFromBracket , faTrash } from '@fortawesome/free-solid-svg-icons';
import DashboardSection from "../components/DashboardSection";

const Dashboard = () => {
    return(
        <>
        <ParticlesBg type="tadpole" bg={true} />
        <h1 className="text-4xl text-center mt-10">Dashboard</h1>
        <div className="flex justify-center gap-10 mt-20 mb-38">
            <DashboardSection icon={faPassport} title="Password" link="/passwords" />
            <DashboardSection icon={faExchange} title="Change Password" link="/change-password" />
            <DashboardSection icon={faRightFromBracket} title="Logout" link="/logout" />
            <DashboardSection icon={faTrash} title="Delete Account" link="/delete-account" />
        </div>
        </>
    );
}

export default Dashboard;