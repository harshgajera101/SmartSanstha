import express from 'express';

const router = express.Router();

// Get all court scenarios
router.get('/scenarios', async (req, res) => {
  console.log('🎯 /api/court/scenarios endpoint was hit!');
  try {
    // Sample scenarios - you can later fetch from database
    const scenarios = [
      {
        _id: '1',
        title: 'Right to Equality Case',
        article: 'Article 14',
        description: 'A landmark case testing the principle of equality before law',
        roleplay: [
          {
            speaker: 'judge',
            line: 'The court is now in session. We will hear arguments regarding alleged violation of Article 14 - Right to Equality.'
          },
          {
            speaker: 'counsel',
            line: 'Your Honor, my client has been denied equal treatment under the law without any reasonable classification, which directly violates Article 14 of the Constitution.'
          },
          {
            speaker: 'prosecutor',
            line: 'Your Honor, the state contends that the classification was reasonable and based on intelligible differentia with a rational nexus to the objective.'
          },
          {
            speaker: 'witness',
            line: 'I can confirm that persons in identical situations were treated differently without any justifiable reason or explanation.'
          },
          {
            speaker: 'counsel',
            line: 'Your Honor, the evidence clearly shows arbitrary discrimination. Article 14 mandates that the State shall not deny any person equality before the law.'
          },
          {
            speaker: 'judge',
            line: 'The court has heard all arguments. I will now consider whether the classification meets the test of reasonable classification under Article 14.'
          }
        ],
        verdictOptions: [
          'Rule in favor of the petitioner - Article 14 was violated',
          'Rule in favor of the state - Classification was reasonable',
          'Dismiss the case for lack of evidence'
        ],
        correctVerdict: 'Rule in favor of the petitioner - Article 14 was violated',
        explanation: 'Article 14 ensures equality before law and equal protection of laws. Any classification must be: (1) based on intelligible differentia, and (2) have a rational nexus with the object sought to be achieved. In this case, the classification was arbitrary and failed both tests.'
      },
      {
        _id: '2',
        title: 'Freedom of Speech Case',
        article: 'Article 19(1)(a)',
        description: 'A case examining the limits of freedom of speech and expression',
        roleplay: [
          {
            speaker: 'judge',
            line: 'This court will now hear the case concerning the fundamental right to freedom of speech and expression guaranteed under Article 19(1)(a).'
          },
          {
            speaker: 'counsel',
            line: 'Your Honor, my client organized a peaceful protest that was wrongfully suppressed by the authorities, violating their constitutional right to free speech.'
          },
          {
            speaker: 'prosecutor',
            line: 'The state imposed reasonable restrictions under Article 19(2) in the interest of public order, sovereignty, and security of the state.'
          },
          {
            speaker: 'witness',
            line: 'The protest was entirely peaceful. There were no inflammatory speeches, no violence, and no threat to public order whatsoever.'
          },
          {
            speaker: 'judge',
            line: 'The crucial question is: Were the restrictions imposed by the state reasonable and proportionate to the perceived threat?'
          },
          {
            speaker: 'prosecutor',
            line: 'Your Honor, preventive action was necessary. We cannot wait for violence to occur before taking measures to protect public safety.'
          },
          {
            speaker: 'counsel',
            line: 'Your Honor, a blanket ban on peaceful assembly is not a reasonable restriction. It violates the very essence of Article 19(1)(a).'
          }
        ],
        verdictOptions: [
          'Rule for petitioner - Restrictions were unconstitutional',
          'Rule for state - Restrictions were reasonable and necessary',
          'Partial relief - Modify the restrictions to allow peaceful protest'
        ],
        correctVerdict: 'Rule for petitioner - Restrictions were unconstitutional',
        explanation: 'Article 19(1)(a) guarantees freedom of speech and expression, subject to reasonable restrictions under Article 19(2). However, restrictions must be: (1) reasonable, (2) necessary, and (3) proportionate. Blanket bans on peaceful protests without specific evidence of threat to public order violate this fundamental right. The state must show clear and present danger to justify such restrictions.'
      },
      {
        _id: '3',
        title: 'Right to Life and Liberty',
        article: 'Article 21',
        description: 'Examining the protection of life and personal liberty',
        roleplay: [
          {
            speaker: 'judge',
            line: 'The court will now hear arguments on whether the petitioner\'s rights under Article 21 have been violated.'
          },
          {
            speaker: 'counsel',
            line: 'Your Honor, my client was detained without following due process of law, which is a clear violation of Article 21.'
          },
          {
            speaker: 'prosecutor',
            line: 'The detention was necessary for national security and followed the procedure established by law.'
          },
          {
            speaker: 'witness',
            line: 'The petitioner was held in custody for 48 hours without being informed of the grounds of arrest or being produced before a magistrate.'
          },
          {
            speaker: 'counsel',
            line: 'Article 21 requires not just any procedure, but a fair, just, and reasonable procedure. The detention violated these principles.'
          },
          {
            speaker: 'judge',
            line: 'The court must determine if the procedure followed was just, fair, and reasonable as mandated by Article 21.'
          }
        ],
        verdictOptions: [
          'Rule for petitioner - Article 21 was violated',
          'Rule for state - Procedure was lawful',
          'Order compensation but uphold detention'
        ],
        correctVerdict: 'Rule for petitioner - Article 21 was violated',
        explanation: 'Article 21 states that no person shall be deprived of life or personal liberty except according to procedure established by law. However, the Supreme Court has held that this procedure must be just, fair, and reasonable. Detention without informing the person of grounds of arrest and without producing them before a magistrate violates the principles of natural justice and Article 21.'
      }
    ];

    res.json({
      success: true,
      data: scenarios,
      count: scenarios.length
    });
  } catch (error) {
    console.error('❌ Error in /api/court/scenarios:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch court scenarios',
      message: error.message 
    });
  }
});

export default router;