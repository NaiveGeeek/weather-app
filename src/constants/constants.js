import sunny from "../assets/sunny.svg";
import cloudyday from "../assets/cloudy.svg";
import cloudynight from "../assets/cloudynight.svg";
import storm from "../assets/storm.svg";
import shower from "../assets/shower.svg";
import rain from "../assets/rain.svg";
import snow from "../assets/snow.svg";
import mist from "../assets/mist.svg";
import clearnight from "../assets/clearnight.svg";
import overcast from "../assets/overcast.svg";

export const weatherType ={
    200:{day:storm,night:storm},
    201:{day:storm,night:storm},
    202:{day:storm,night:storm},
    210:{day:storm,night:storm},
    211:{day:storm,night:storm},
    212:{day:storm,night:storm},
    221:{day:storm,night:storm},
    230:{day:storm,night:storm},
    231:{day:storm,night:storm},
    232:{day:storm,night:storm},
    300:{day:shower,night:shower},
    301:{day:shower,night:shower},
    302:{day:shower,night:shower},
    310:{day:shower,night:shower},
    311:{day:shower,night:shower},
    312:{day:shower,night:shower},
    313:{day:shower,night:shower},
    314:{day:shower,night:shower},
    321:{day:shower,night:shower},
    500:{day:rain,night:rain},
    501:{day:rain,night:rain},
    502:{day:rain,night:rain},
    503:{day:rain,night:rain},
    504:{day:rain,night:rain},
    511:{day:snow,night:snow},
    520:{day:rain,night:rain},
    521:{day:rain,night:rain},
    522:{day:rain,night:rain},
    531:{day:rain,night:rain},
    600:{day:snow,night:snow},
    601:{day:snow,night:snow},
    602:{day:snow,night:snow},
    611:{day:snow,night:snow},
    612:{day:snow,night:snow},
    613:{day:snow,night:snow},
    615:{day:snow,night:snow},
    616:{day:snow,night:snow},
    620:{day:snow,night:snow},
    621:{day:snow,night:snow},
    622:{day:snow,night:snow},
    701:{day:mist,night:mist},
    711:{day:mist,night:mist},
    721:{day:mist,night:mist},
    731:{day:mist,night:mist},
    741:{day:mist,night:mist},
    751:{day:mist,night:mist},
    761:{day:mist,night:mist},
    762:{day:mist,night:mist},
    771:{day:mist,night:mist},
    781:{day:mist,night:mist},
    800:{day:sunny,night:clearnight},
    801:{day:cloudyday,night:cloudynight},
    802:{day:cloudyday,night:cloudynight},
    803:{day:overcast,night:overcast},
    804:{day:overcast,night:overcast},
}

export const dayName ={
    0:"Sunday",
    1:"Monday",
    2:"Tuesday",
    3:"Wednesday",
    4:"Thursday",
    5:"Friday",
    6:"Saturday"
}