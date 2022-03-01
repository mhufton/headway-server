const { appendUnique, generateSlug } = require("./utilities");

const resolvers = {
  Query: {
    async user(root, { id }, { models }) {
      return models.User.findByPk(id);
    },
    async links(root, {}, { models }) {
      return models.Link.findAll({ order: [["createdAt", "DESC"]], limit: 10 });
    },
  },
  Mutation: {
    async createUser(root, { name, email, password }, { models }) {
      return models.User.create({
        name,
        email,
        password,
      });
    },
    async createLink(root, { url, slug }, { models }) {
      const newSlug = slug
        ? await appendUnique(slug, models)
        : await generateSlug(models);

      return models.Link.create({
        url,
        slug: newSlug,
      });
    },
  },
};

module.exports = resolvers;
