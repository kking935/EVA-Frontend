import {
	FaAngry,
	FaBookOpen,
	FaBookReader,
	FaBriefcase,
	FaBuilding,
	FaCarrot,
	FaChevronRight,
	FaChurch,
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
		color: 'bg-red-400',
		sublabels: {
			Employment: <FaBriefcase size={iconSize} />,
			'Food Insecurity': <FaUtensils size={iconSize} />,
			'Housing Instability': <FaHome size={iconSize} />,
			Poverty: <FaMoneyCheck size={iconSize} />,
		},
	},
	'Education Access and Quality': {
		icon: <FaGraduationCap size={iconSize} />,
		color: 'bg-orange-400',
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
		color: 'bg-yellow-400',
		sublabels: {
			'Access to Health Services': <FaHospital size={iconSize} />,
			'Access to Primary Care': <FaUserNurse size={iconSize} />,
			'Health Literacy': <FaHospitalUser size={iconSize} />,
		},
	},
	'Neighborhood and Built Environment': {
		icon: <FaUserNurse size={iconSize} />,
		color: 'bg-purple-400',
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
		color: 'bg-pink-400',
		sublabels: {
			'Civic Participation': <FaHandsHelping size={iconSize} />,
			Discrimination: <FaAngry size={iconSize} />,
			Incarceration: <FaGavel size={iconSize} />,
			'Social Cohesion': <FaUserFriends size={iconSize} />,
		},
	},
};

export const DisplayLabelIcon = ({
	label,
	sublabel,
}: {
	label: string;
	sublabel: string;
}) => {
	return (
		<div
			className={`w-fit shadow-lg my-0.5 mr-2 h-8 text-sm px-2 space-x-1 rounded-lg flex justify-center items-center ${labelStyles[label].color}`}
		>
			{labelStyles[label].sublabels[sublabel]}
			<p>{sublabel}</p>
		</div>
	);
};

export const DisplayLabelIcons = ({
	labels,
}: {
	labels: Record<string, string[]>;
}) => {
	return (
		<>
			<div className='flex flex-row justify-start items-center flex-wrap'>
				{Object.entries(labels).map(
					([label, sublabels]: [string, string[]]) =>
						sublabels.map((sublabel: string) => (
							<DisplayLabelIcon
								key={label + sublabel}
								label={label}
								sublabel={sublabel}
							/>
						))
				)}
			</div>
		</>
	);
};