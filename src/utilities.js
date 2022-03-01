const { ApolloError } = require("apollo-server");

const generateSlug = async (models) => {
  return await recursiveSlug(4, 1, models);
};

const appendUnique = async (slug, models) => {
  return await recursiveAppendUnique(slug, 0, models);
};

const recursiveSlug = async (length, attempt, models) => {
  if (attempt > 4) {
    throw new ApolloError("Failed to generate a unique slug");
  }

  const slug = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, Math.min(4, length));

  const slugUsed = await slugTaken(slug, models);

  return slugUsed ? await recursiveSlug(length, attempt + 1, models) : slug;
};

const recursiveAppendUnique = async (slug, attempt, models) => {
  if (attempt > 4) {
    throw new ApolloError("Failed to generate a unique slug");
  }

  const slugTest = attempt === 0 ? slug : `${slug}-${attempt}`;
  const slugUsed = await slugTaken(slugTest, models);

  return slugUsed
    ? await recursiveAppendUnique(slug, attempt + 1, models)
    : slugTest;
};

const slugTaken = async (slug, models) => {
  const slugUsed = await models.Link.count({
    where: {
      slug,
    },
  });

  return slugUsed > 0;
};

module.exports = {
  generateSlug,
  appendUnique,
};
