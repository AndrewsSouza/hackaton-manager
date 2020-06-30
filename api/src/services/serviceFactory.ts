import RatingServiceFacade from "./ratingService/ratingServiceFacade";
import RatingService from "./ratingService/ratingService";
import TeamServiceFacade from "./teamService/teamServiceFacade";
import TeamService from "./teamService/teamService";
import AppraiserServiceFacade from "./appraiserService/appraiserServiceFacade";
import AppraiserService from "./appraiserService/appraiserService";
import StudentServiceFacade from "./studentService/studentServiceFacade";
import StudentService from "./studentService/studentService";
import ResultServiceFacade from "./resultService/resultServiceFacade";
import ResultService from "./resultService/resultService";

export default class ServiceFactory {
    static getRatingService(): RatingServiceFacade {
        return new RatingService()
    }
    static getTeamService(): TeamServiceFacade {
        return new TeamService()
    }
    static getAppraiserService(): AppraiserServiceFacade {
        return new AppraiserService()
    }
    static getStudentService(): StudentServiceFacade {
        return new StudentService()
    }
    static getResultService(): ResultServiceFacade {
        return new ResultService()
    }
}