
---------------
-- Data inserts

INSERT INTO help
 (column1, column2, column3, ...)
VALUES
(value1, value2, value3),
(value1, value2, value3);


INSERT INTO public.help
("subHeading", "helpText", reference_id)
VALUES
("", "", null);

INSERT INTO public.help
("subHeading", "helpText", reference_id)
VALUES
("Units",
"Do you weigh yourself in pounds?  Stones and Pounds?  Kg?  Specify that on this page!\n\n\nDo you measure your height in cm (metric) or feet and inches (imperial)?\n\n\nSpecify here and we'll stick to that unless you change it here...\n",
null);

INSERT INTO public.help
("subHeading", "helpText", reference_id)
VALUES
("Gender",
"Generally, females weigh less than males even though they naturally have a higher percentage of body fat.\n\n     This is because the male body generally has higher muscle mass, and muscle is heavier than fat.\n\n    * Women generally have lower bone density.\n\n    * Last but not least, males tend to be taller than females\n",
null);

--TODO Continue this on getting the text in a form that can be stored in a non-backtick string


  const helpSlideValues = [
    {
      subHeading: 'Units',
      text: `Do you weigh yourself in pounds?  Stones and Pounds?  Kg?  Specify that on this page!

Do you measure your height in cm (metric) or feet and inches (imperial)?

Specify here and we'll stick to that unless you change it here...
               `,
      references: [{ title: null, link: null }],
    },
    {
      subHeading: 'Gender',
      text: `Generally, females weigh less than males even though they naturally have a higher percentage of body fat.

      This is because the male body generally has higher muscle mass, and muscle is heavier than fat.

      * Women generally have lower bone density.

      * Last but not least, males tend to be taller than females.`,
      references: [
        {
          title:
            'Sex differences in human adipose tissues: the biology of pear shape',
          link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3411490/',
        },
      ],
    },
    {
      subHeading: 'Age',
      text: `In theory, age shouldn't be a large determinant of an ideal body weight past the ages of 14-15 for girls and 16-17 for boys, after which most people stop growing.

      It is actually expected that human males and females to lose 1.5 and 2 inches in height respectively by age 70.

      It is possible to remove the effects of aging by adopting various habits such as monitoring diet, exercise, stress, supplementation and sleep.`,
      references: [
        {
          title:
            'A Research Agenda: The Changing Relationship Between Body Weight and Health in Aging',
          link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4984841/',
        },
      ],
    },
    {
      subHeading: 'Height',
      text: 'The taller the person, the more muscle mass and body fat they have, which results in more weight. A male at a similar height to a female should weigh about 10-20% heavier.',
      references: [
        {
          title:
            'Robinson JD, Lupkiewicz SM, Palenik L, Lopez LM, Ariet M, Determination of ideal body weight for drug dosage calculations. Am J Hosp Parm 1983',
          link: 'https://pubmed.ncbi.nlm.nih.gov/6869387/',
        },
      ],
    },
    {
      subHeading: 'Frame',
      text: `Body frame size is another factor that can have a significant impact on the measurement of ideal weight.

      Body frame size is typically categorized as small, medium, or large boned. It is measured based on the circumference of a person's wrist in relation to their height, as shown below.

      For women:

      Height under 5 ft 2 in
      Small boned = wrist size less than 5.5 in
      Medium boned = wrist size 5.5 in to 5.75 in
      Large boned = wrist size over 5.75 in
      Height between 5 ft 2 in and 5 ft 5 in
      Small boned = wrist size less than 6 in
      Medium boned = wrist size 6 in to 6.25 in
      Large boned = wrist size over 6.25 in
      Height over 5 ft 5 in
      Small boned = wrist size less than 6.25 in
      Medium boned = wrist size 6.25 in to 6.5 in
      Large boned = wrist size over 6.5 in

      For men:

      Height over 5 ft 5 in
      Small boned = wrist size 5.5 in to 6.5 in
      Medium boned = wrist size 6.5 in to 7.5 in
      Large boned = wrist size over 7.5 in

      A person who is large boned will naturally weigh more than someone who is small boned, even at the same height, making body frame size a factor that can affect measurements such as IBW and BMI.`,
      references: [
        {
          title: 'How to Measure Your Wrist to Get Your Body Frame Size',
          link: 'https://www.livestrong.com/article/175491-how-to-measure-wrist-size-for-body-frame-measurement/',
        },
      ],
    },
    {
      subHeading: 'Weight',
      text: `

      Although healthy body weight (HBW) today is sometimes based on perceived visual appeal, HBW was actually introduced to estimate dosages for medical use, and the formulas that calculate it are not at all related to how a person looks at a given weight.

      It has since been determined that the metabolism of certain drugs is more based on HBW than it is total body weight. Today, HBW is also used widely throughout sports, since many sports classify people based on their body weight.

      Note that HBW is not a perfect measurement. It does not consider the percentages of body fat and muscle in a person's body. This means that it is possible for highly fit, healthy athletes to be considered overweight based on their HBW.

      This is why HBW should be considered with the perspective that it is an imperfect measure and not necessarily indicative of health, or a weight that a person should necessarily strive toward; it is possible to be over or under your "HBW" and be perfectly healthy.

      How much a person should weigh is not an exact science. It is highly dependent on each individual. Thus far, there is no measure, be it HBW, body mass index (BMI), or any other that can definitively state how much a person should weigh to be healthy.

      They are only references, and it's more important to adhere to making healthy life choices such as regular exercise, eating a variety of unprocessed foods, getting enough sleep, etc. than it is to chase a specific weight based on a generalized formula.

      That being said, many factors can affect the healthy weight; the major factors are listed below. Other factors include health conditions, fat distribution, progeny, etc.`,
      references: [
        {
          title: 'Ideal Body Weight',
          link: 'https://www.sciencedirect.com/topics/medicine-and-dentistry/ideal-body-weight',
        },
      ],
    },
    null,
    null,
    null,
  ]










---------------
-- Sequences

help_id_seq
nextval ('help_id_seq':: regclass)


reference_id_seq
nextval ('reference_id_seq':: regclass)

---------------
-- Foreign keys

-- add reference foreign key to help table

ALTER TABLE help
ADD CONSTRAINT fk
FOREIGN KEY (reference_id)
REFERENCES reference (reference_id);



------------------------------------------------
------------------------------------------------
-- CREATE SCRIPTS
------------------------------------------------
------------------------------------------------

-- Table: public.reference
------------------------------------------------

-- DROP TABLE IF EXISTS public.reference;

CREATE TABLE IF NOT EXISTS public.reference
(
    title character varying(255) COLLATE pg_catalog."default",
    link character varying(255) COLLATE pg_catalog."default",
    reference_id integer NOT NULL DEFAULT nextval('reference_id_seq'::regclass),
    CONSTRAINT reference_pkey PRIMARY KEY (reference_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reference
    OWNER to healthier;



-- Table: public.help

-- DROP TABLE IF EXISTS public.help;

CREATE TABLE IF NOT EXISTS public.help
(
    "subHeading" character varying(255) COLLATE pg_catalog."default",
    "helpText" text COLLATE pg_catalog."default" NOT NULL,
    reference_id integer,
    help_id integer NOT NULL DEFAULT nextval('help_id_seq'::regclass),
    CONSTRAINT help_pkey PRIMARY KEY (help_id),
    CONSTRAINT fk FOREIGN KEY (reference_id)
        REFERENCES public.reference (reference_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.help
    OWNER to healthier;

