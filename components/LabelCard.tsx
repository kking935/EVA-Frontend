import {
	FaAngry,
	FaBookReader,
	FaBriefcase,
	FaCarrot,
	FaGavel,
	FaGraduationCap,
	FaHandsHelping,
	FaHome,
	FaHospital,
	FaHospitalUser,
	FaHouseDamage,
	FaMoneyCheck,
	FaSchool,
	FaSeedling,
	FaSkullCrossbones,
	FaUniversity,
	FaUserFriends,
	FaUserNurse,
	FaUtensils,
} from 'react-icons/fa';

export type LabelStyle = {
	[key: string]: {
		icon: any;
		color: string;
		sublabels: {
			[key: string]: any;
		};
	};
};

const iconSize = 20;

export const labelStyles: LabelStyle = {
	'Economic Stability': {
		icon: <FaMoneyCheck size={iconSize} />,
		color: 'bg-red-300',
		sublabels: {
			Employment: <FaBriefcase size={iconSize} />,
			'Food Insecurity': <FaUtensils size={iconSize} />,
			'Housing Instability': <FaHome size={iconSize} />,
			Poverty: <FaMoneyCheck size={iconSize} />,
		},
	},
	'Education Access and Quality': {
		icon: <FaGraduationCap size={iconSize} />,
		color: 'bg-orange-300',
		sublabels: {
			'Early Childhood Development and Education': (
				<FaSchool size={iconSize} />
			),
			'Enrollment in Higher Education': <FaUniversity size={iconSize} />,
			'High School Graduation': <FaGraduationCap size={iconSize} />,
			'Language and Literacy': <FaBookReader size={iconSize} />,
		},
	},
	'Health Care Access and Quality': {
		icon: <FaHospital size={iconSize} />,
		color: 'bg-yellow-300',
		sublabels: {
			'Access to Health Services': <FaHospital size={iconSize} />,
			'Access to Primary Care': <FaUserNurse size={iconSize} />,
			'Health Literacy': <FaHospitalUser size={iconSize} />,
		},
	},
	'Neighborhood and Built Environment': {
		icon: <FaUserNurse size={iconSize} />,
		color: 'bg-purple-300',
		sublabels: {
			'Access to Foods That Support Healthy Dietary Patterns': (
				<FaCarrot size={iconSize} />
			),
			'Crime and Violence': <FaSkullCrossbones size={iconSize} />,
			'Environmental Conditions': <FaSeedling size={iconSize} />,
			'Quality of Housing': <FaHouseDamage size={iconSize} />,
		},
	},
	'Social and Community Context': {
		icon: <FaUserNurse size={iconSize} />,
		color: 'bg-pink-300',
		sublabels: {
			'Civic Participation': <FaHandsHelping size={iconSize} />,
			Discrimination: <FaAngry size={iconSize} />,
			Incarceration: <FaGavel size={iconSize} />,
			'Social Cohesion': <FaUserFriends size={iconSize} />,
		},
	},
};

export const DisplayLabelIcon = ({ sublabel }: { sublabel: string }) => {
	let label = '';

	for (const label_name in labelStyles) {
		const label_style = labelStyles[label_name];
		for (const sublabel_name in label_style['sublabels']) {
			if (sublabel_name == sublabel) {
				label = label_name;
			}
		}
	}

	if (!label) {
		return <></>;
	}

	return (
		<div
			className={`w-fit shadow my-0.5 mr-2 h-8 text-xs sm:text-sm px-2 space-x-1 rounded-lg flex justify-center items-center ${labelStyles[label].color}`}
		>
			{labelStyles[label].sublabels[sublabel]}
			<p>{sublabel}</p>
		</div>
	);
};
