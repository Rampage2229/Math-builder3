          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-900/20 border border-blue-500/20 dark:border-blue-900/30 text-blue-400 dark:text-blue-300 text-sm font-medium mb-6">
              {dict.track_badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 leading-tight">
              {dict.page_title}
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {dict.page_subtitle}
            </p>
          </div>

          <TheorySection
            title={dict.limits_title}
            description={dict.limits_desc}
            topics={pageTopics.filter((t) => t.id === "limits")}
          />
          <TheorySection
            title={dict.continuity_title}
            description={dict.continuity_desc}
            topics={pageTopics.filter((t) => t.id === "continuity")}
          />
          <TheorySection
            title={dict.derivatives_title}
            description={dict.derivatives_desc}
            topics={pageTopics.filter((t) => t.id === "derivatives")}
          />
          <TheorySection
            title={dict.integrals_title}
            description={dict.integrals_desc}
            topics={pageTopics.filter((t) => t.id === "integrals")}
          />
          <TheorySection
            title={dict.vectors_title}
            description={dict.vectors_desc}
            topics={pageTopics.filter((t) => t.id === "vectors")}
          />
          <TheorySection
            title={dict.matrices_title}
            description={dict.matrices_desc}
            topics={pageTopics.filter((t) => t.id === "matrices")}
          />
          <TheorySection
            title={dict.combinatorics_title}
            description={dict.combinatorics_desc}
            topics={pageTopics.filter((t) => t.id === "combinatorics")}
          />
          <TheorySection
            title={dict.probability_title}
            description={dict.probability_desc}
            topics={pageTopics.filter((t) => t.id === "probability")}
          />
          <TheorySection
            title={dict.descriptive_statistics_title}
            description={dict.descriptive_statistics_desc}
            topics={pageTopics.filter((t) => t.id === "descriptive-statistics")}
          />

          {/* Derivative Visualization */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 text-center">
              {dict.derivatives_title} - Interactive Visualization
            </h2>
            <DerivativeVisualization
              func={(x) => x ** 3 - 3 * x ** 2 + 2}
              derivative={(x) => 3 * x ** 2 - 6 * x}
              xMin={-2}
              xMax={4}
              pointOfInterest={1}
              title="Derivative: f(x) = x³ - 3x² + 2"
              xLabel="x"
              yLabel="y"
            />
          </section>

          {/* Continuity Visualization */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 text-center">
              {dict.continuity_title} - Interactive Visualization
            </h2>
            <ContinuityVisualization
              func={(x) => {
                if (x < 0) return x + 1;
                if (x === 0) return 1;
                return x * x + 1;
              }}
              xMin={-3}
              xMax={3}
              discontinuities={[
                {
                  x: 0,
                  type: "removable",
                  leftLimit: 1,
                  rightLimit: 1,
                  value: 1,
                },
              ]}
              title="Continuity: Piecewise Function"
              xLabel="x"
              yLabel="f(x)"
            />
          </section>

          {/* Combinatorics Visualization */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 text-center">
              {dict.combinatorics_title} - Interactive Visualization
            </h2>
            <CombinatoricsVisualization
              type="combinations"
              n={10}
              k={3}
              title="Combinations: C(10, k)"
            />
            <CombinatoricsVisualization
              type="permutations"
              n={8}
              k={3}
              title="Permutations: P(8, k)"
            />
            <CombinatoricsVisualization
              type="binomial"
              n={6}
              title="Binomial Coefficients: (a+b)⁶"
            />
          </section>

          {/* Descriptive Statistics Visualization */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 text-center">
              {dict.descriptive_statistics_title} - Interactive Visualization
            </h2>
            <DescriptiveStatsVisualization
              data={[12, 15, 18, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 55, 60, 65, 70, 75]}
              title="Sample Dataset Distribution"
              xLabel="Value"
              yLabel="Frequency"
            />
          </section>
        </section>
      </main>
    </div>
  );
}
