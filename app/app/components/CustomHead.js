import Head from 'next/head'
import React, {Component} from "react"

class CustomHead extends Component {
    render() {
        return(
            <Head>
                <title>My Restaurant</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css?family=Josefin+Sans" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css?family=Nothing+You+Could+Do" rel="stylesheet"/>

                <link rel="stylesheet" href="./static/css/open-iconic-bootstrap.min.css"/>
                <link rel="stylesheet" href="./static/css/animate.css"/>

                <link rel="stylesheet" href="./static/css/owl.carousel.min.css"/>
                <link rel="stylesheet" href="./static/css/owl.theme.default.min.css"/>
                <link rel="stylesheet" href="./static/css/magnific-popup.css"/>

                <link rel="stylesheet" href="./static/css/aos.css"/>

                <link rel="stylesheet" href="./static/css/ionicons.min.css"/>

                <link rel="stylesheet" href="./static/css/bootstrap-datepicker.css"/>
                <link rel="stylesheet" href="./static/css/jquery.timepicker.css"/>


                <link rel="stylesheet" href="./static/css/flaticon.css"/>
                <link rel="stylesheet" href="./static/css/icomoon.css"/>
                <link rel="stylesheet" href="./static/css/style.css"/>
                <link rel="stylesheet" href="./static/css/custom-style.css"/>

                <script src="./static/js/jquery.min.js"></script>
                <script src="./static/js/jquery-migrate-3.0.1.min.js"></script>
                <script src="./static/js/popper.min.js"></script>
                <script src="./static/js/bootstrap.min.js"></script>
                <script src="./static/js/jquery.easing.1.3.js"></script>
                <script src="./static/js/jquery.waypoints.min.js"></script>
                <script src="./static/js/jquery.stellar.min.js"></script>
                <script src="./static/js/owl.carousel.min.js"></script>
                <script src="./static/js/jquery.magnific-popup.min.js"></script>
                {/*<script src="./static/js/aos.js"></script>*/}
                <script src="./static/js/jquery.animateNumber.min.js"></script>
                <script src="./static/js/bootstrap-datepicker.js"></script>
                <script src="./static/js/jquery.timepicker.min.js"></script>
                <script src="./static/js/scrollax.min.js"></script>
                {/*<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false"></script>
                <script src="./static/js/google-map.js"></script>
                <script src="./static/js/main.js"></script>*/}
            </Head>
        )
    }
}

export default CustomHead
