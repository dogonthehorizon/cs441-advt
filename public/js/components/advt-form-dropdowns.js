/**
 * advt-form-dropdowns
 *
 * Construct dropdown menus for use in the primary form and append them to the provided
 * elements.
 *
 * @author Fernando Freire
 * @since 11/13/13
 *
 * @depends 'jQuery'
 */
define([
    'jquery'
], function($){

    // Supported application types
    var _applicationTypeOptions = {
        "app-total": "All",
        "app-completed": "Completed",
        "app-accepted": "Accepted",
        "app-waitlisted": "Waitlisted",
        "app-deposit": "with Deposit",
        "app-campus-visit": "with Campus Visitation",
        "app-avj": "with Admissions Visitation Day",
        "app-svd": "with Saturday Visit (SVD)",
        "app-home-fair-visit": "with Hometown College Fair Visitation",
        "app-home-fair-intro": "with personal introduction at college fair",
        "app-sneaker": "Sneaker Applications"
    };

    // Supported Fields of Study
    var _intendedMajorOptions = {
        502:	'Accounting',
        2105:	'Administration of Justice',
        496:	'Allied Health Science',
        414:	'Bio-Chemistry',
        401:	'Biology',
        500:	'Business Admin:Undeclared',
        501:	'Business Administration',
        518:	'Business Computer Systems',
        2305:	'Catholic Studies',
        1905:	'Chemistry',
        1906:	'Chemistry: ACS',
        1907:	'Chemistry: Biochemistry',
        UP04:	'Childrearing & Family Nursing',
        908:	'Civil Egr:Civil Track',
        907:	'Civil Egr:Environmental Track',
        1222:	'Clinical Nurse Leader',
        826:	'College Student Personnel',
        600:	'Communication',
        601:	'Communication',
        699:	'Communication Management',
        UP02:	'Community Health & Admin',
        706:	'Computer Applications Managmnt',
        701:	'Computer Science',
        6000:	'Continuing Education',
        807:	'Counseling',
        804:	'Counseling/Psychology',
        2297:	'Criminal Justice',
        1230:	'DNP Doctor of Nursing Practice',
        1007:	'Drama',
        517:	'Economics',
        899:	'Education',
        810:	'Education',
        800:	'Education (MA)',
        809:	'Education (MAT)',
        801:	'Education (MED)',
        827:	'Educational Administration',
        925:	'Elec Egr:Computer Track ',
        909:	'Elec Egr:Electrical Track',
        911:	'Electrical Engineering (MSEE)',
        802:	'Elementary Education',
        900:	'Engineering',
        1921:	'Engineering Chemistry',
        913:	'Engineering Management',
        926:	'Engineering Science',
        901:	'Engineering, General',
        1501:	'English',
        507:	'Entrepreneurship',
        302:	'Envir Ethics & Policy',
        301:	'Environmental Science',
        1508:	'ESOL',
        515:	'Finance',
        1001:	'Fine Arts',
        1102:	'French',
        324:	'French Studies',
        495:	'General Science',
        4906:	'General Studies (BA)',
        4905:	'General Studies (BS)',
        1103:	'German',
        325:	'German Studies',
        499:	'Gerontology',
        514:	'Global Business',
        497:	'Health Care Management',
        2205:	'History',
        2216:	'History & Government',
        835:	'HPE: Sport Exercise & Fitness',
        950:	'Industrial Engineering',
        UP05:	'Innovative Ldrship & Mgmt',
        4901:	'Interdisciplinary',
        1108:	'Japanese',
        399:	'Japanese Studies',
        602:	'Journalism',
        1601:	'Library Science',
        402:	'Life Science',
        1999:	'Life Science',
        506:	'Management',
        698:	'Management Communication',
        509:	'Marketing',
        513:	'Marketing and Management',
        UP03:	'Maternal & Child Nursing',
        1701:	'Mathematics',
        1702:	'Mathematics',
        910:	'Mechanical Engineering',
        1223:	'Medical Technology',
        1101:	'Modern Languages',
        1005:	'Music',
        832:	'Music Education',
        5000:	'Non-Matriculating',
        1203:	'Nursing',
        1201:	'Nursing',
        1210:	'Nursing Educator Specialty',
        1204:	'Nursing -RN/BSN/MS',
        1205:	'Nursing: Adult Health',
        1209:	'Nursing: Adult Nrs Pract',
        1206:	'Nursing: Community Hlth',
        1208:	'Nursing: Family Nrs Pract',
        1207:	'Nursing: Leadrshp Hlth Sys',
        508:	'Operations Technology Mgmt',
        604:	'Organizational Communication',
        2399:	'Pastoral Ministry',
        2199:	'Peace Studies',
        1509:	'Philosophy',
        1901:	'Physical Science',
        1902:	'Physics',
        2207:	'Political Science',
        1212:	"Post Master's FNP Program",
        1211:	"Post Master's Nursing Ed",
        603:	'Pre-Communication',
        UP06:	'Psych/Mental Hlth Nrs Teaching',
        2001:	'Psychology',
        830:	'Reading Education',
        2304:	'Religious Education',
        498:	'Science Communication',
        803:	'Secondary Education',
        2107:	'Social Justice',
        2104:	'Social Service',
        2103:	'Social Work',
        2298:	'Society & Justice',
        2299:	'Society & Justice',
        2208:	'Sociology',
        2209:	'Sociology:Criminal Justice',
        1105:	'Spanish',
        808:	'Special Education',
        1506:	'Speech',
        805:	'Student Development',
        806:	'Student Services Administratn',
        1099:	'Theater Management',
        2301:	'Theology',
        0:      'Undecided',
        4999:	'Undeclared',
        UP01:	'Zoology'
    };

    return {

        /**
         * initApplicationType
         *
         * Given a form select object, attach the supported array
         * of application types to that select object.
         *
         * @auther Fernando Freire
         * @since 11/13/13
         *
         * @param select - the DOM node associated with a select element.
         */
        "initApplicationType": function(select) {
            $.each(_applicationTypeOptions, function(value, text){
                select.append(
                    $('<option></option>').val(value).html(text)
                );
            });
        },

        /**
         * initIntendedMajor
         *
         * Given a form select object, attach the supported array
         * of fields of study to that select object.
         *
         * @author Fernando Freire
         * @since 11/13/13
         *
         * @param select - the DOM node associated with a select element.
         */
        "initIntendedMajor": function(select) {
            $.each(_intendedMajorOptions, function(value, text){
                select.append(
                    $('<option></option>').val(value).html(text)
                );
            });
        }
    };
});

