import { UserProfile } from "@clerk/nextjs";

const SettingsPage = () => {
    return (
        <div className="flex items-center justify-center w-full">
            <UserProfile path="/settings" routing="path" />
        </div>
    );
};

export default SettingsPage;