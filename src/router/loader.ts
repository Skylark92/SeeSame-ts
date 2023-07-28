import getSurveys from 'api/survey/getSurveys';

export async function surveyLoader() {
  const response = await getSurveys();

  if (response.length === 0) {
    throw new Response('Error!', { status: 404 });
  }

  return response;
}
