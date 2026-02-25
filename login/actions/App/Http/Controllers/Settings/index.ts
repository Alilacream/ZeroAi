import ProfileController from './ProfileController'
import PasswordController from './PasswordController'
import AppearanceController from './AppearanceController'
import TwoFactorAuthenticationController from './TwoFactorAuthenticationController'

const Settings = {
    ProfileController: Object.assign(ProfileController, ProfileController),
    PasswordController: Object.assign(PasswordController, PasswordController),
    AppearanceController: Object.assign(AppearanceController, AppearanceController),
    TwoFactorAuthenticationController: Object.assign(TwoFactorAuthenticationController, TwoFactorAuthenticationController),
}

export default Settings