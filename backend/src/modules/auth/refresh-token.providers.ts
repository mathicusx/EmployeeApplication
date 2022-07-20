import { RefreshToken } from "./refresh.token.entity";
import { REFRESH_TOKENS_REPOSITORY} from '../../core/constants/index';

export const refreshtokenProviders = [{
    provide: REFRESH_TOKENS_REPOSITORY,
    useValue: RefreshToken
}]